import { useRef, useEffect } from 'react';
import {
  useRecoilValue,
  useSetRecoilState,
  useResetRecoilState,
  atom
} from 'recoil';
import { useForm } from 'react-hook-form';
import { FormControl, FormLabel } from '@chakra-ui/react';

import { $notification, $modal } from 'states';
import { Input, Button, Switch, Select } from 'layout';
import { useMutation, useToast } from 'hooks';

const $submit = atom({
  key: 'submit-modal-notification',
  default: null
});

const NotificationModal = ({ id }) => {
  const submitRef = useRef();
  const { register, handleSubmit } = useForm();
  const setSubmit = useSetRecoilState($submit);

  const data = useRecoilValue($notification.read(id));
  const [updateNotification] = useMutation($notification.update(id));

  const resetModal = useResetRecoilState($modal);
  const { addToast } = useToast();

  useEffect(() => {
    setSubmit(submitRef.current);
  }, [submitRef.current]); // eslint-disable-line

  const onSubmit = fields => {
    try {
      const data = {
        ...fields,
        auto: JSON.parse(fields.auto),
        messagePerDoc: JSON.parse(fields.messagePerDoc),
        notifyReception: JSON.parse(fields.notifyReception),
        notifyResponse: JSON.parse(fields.notifyResponse),
        successOnly: JSON.parse(fields.successOnly),
        callbackData: Object.fromEntries(
          Object.entries({
            cod_etape: fields?.callbackData?.cod_etape || null,
            cod_process: fields?.callbackData?.cod_process || null,
            cod_tache: fields?.callbackData?.cod_tache || null,
            comment: fields?.callbackData?.comment || null,
            num_dos: fields?.callbackData?.num_dos || null,
            codeQualification: fields?.callbackData?.codeQualification || null,
            documents: fields?.callbackData?.documents || null,
            numDos: fields?.callbackData?.numDos || null,
            typeDocument: fields?.callbackData?.typeDocument || null,

            ferme: JSON.parse(fields?.callbackData?.ferme || null)
          }).filter(([_, value]) => value !== null)
        ),
        authMethod: fields.authMethod || null,
        username: fields.username || null,
        password: fields.password || null
      };

      updateNotification(data);

      resetModal();

      addToast({
        type: 'success',
        heading: `Notifaction modifié avec succés.`
      });
    } catch (error) {
      addToast({
        type: 'error',
        heading: `Une erreur est survenue lors de la modification.`
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel htmlFor="code-client">code</FormLabel>

        <Input
          id="code-client"
          defaultValue={data.code}
          {...register('code')}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="description">description</FormLabel>

        <Input
          id="description"
          defaultValue={data.description}
          {...register('description')}
        />
      </FormControl>

      <FormControl gridGap="5px" display="flex" alignItems="center">
        <Switch
          id="auto-client"
          defaultChecked={data.auto}
          {...register('auto')}
        />

        <FormLabel m={0} htmlFor="auto-client">
          auto
        </FormLabel>
      </FormControl>

      <FormControl gridGap="5px" display="flex" alignItems="center">
        <Switch
          id="messagePerDoc"
          defaultChecked={data.messagePerDoc}
          {...register('messagePerDoc')}
        />

        <FormLabel m={0} htmlFor="messagePerDoc">
          messagePerDoc
        </FormLabel>
      </FormControl>

      <FormControl gridGap="5px" display="flex" alignItems="center">
        <Switch
          id="notifyReception"
          defaultChecked={data.notifyReception}
          {...register('notifyReception')}
        />

        <FormLabel m={0} htmlFor="notifyReception">
          notifyReception
        </FormLabel>
      </FormControl>

      <FormControl gridGap="5px" display="flex" alignItems="center">
        <Switch
          id="notifyResponse"
          defaultChecked={data.notifyResponse}
          {...register('notifyResponse')}
        />

        <FormLabel m={0} htmlFor="notifyResponse">
          notifyResponse
        </FormLabel>
      </FormControl>

      <FormControl gridGap="5px" display="flex" alignItems="center">
        <Switch
          id="successOnly"
          defaultChecked={data.successOnly}
          {...register('successOnly')}
        />

        <FormLabel m={0} htmlFor="successOnly">
          successOnly
        </FormLabel>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="callbackUrl">callbackUrl</FormLabel>

        <Input
          id="callbackUrl"
          defaultValue={data.callbackUrl}
          {...register('callbackUrl')}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="callbackDataType">callbackDataType</FormLabel>

        <Input
          id="callbackDataType"
          defaultValue={data.callbackDataType}
          {...register('callbackDataType')}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="callbackResponseHandler">
          callbackResponseHandler
        </FormLabel>

        <Input
          id="callbackResponseHandler"
          defaultValue={data.callbackResponseHandler}
          {...register('callbackResponseHandler')}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="callbackResponseHandlerParams-url">
          callbackResponseHandlerParams
        </FormLabel>

        <Input
          id="callbackResponseHandlerParams-url"
          defaultValue={data.callbackResponseHandlerParams?.url ?? ''}
          {...register('callbackResponseHandlerParams.url')}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="username">username</FormLabel>

        <Input
          id="username"
          defaultValue={data.username}
          {...register('username')}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="password">password</FormLabel>

        <Input
          id="password"
          defaultValue={data.password}
          {...register('password')}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="authMethod">authMethod</FormLabel>

        <Input
          id="authMethod"
          defaultValue={data.authMethod}
          {...register('authMethod')}
        />
      </FormControl>

      {false && (
        <FormControl>
          <FormLabel htmlFor="callbackRequiredParams">
            callbackRequiredParams
          </FormLabel>

          <Select
            id="callbackRequiredParams"
            multiple
            options={data.callbackRequiredParams.map(value => ({
              id: value,
              label: value
            }))}
            value={data.callbackRequiredParams.map(value => ({
              id: value,
              label: value
            }))}
            variant="inline-listbox"
            {...register('callbackRequiredParams')}
          />
        </FormControl>
      )}

      <FormControl id="callbackData">
        <FormLabel htmlFor="callbackData-cod_etape">callbackData</FormLabel>

        <div>
          <div>
            <FormLabel htmlFor="callbackData-cod_etape">cod_etape</FormLabel>

            <Input
              id="callbackData-cod_etape"
              defaultValue={data?.callbackData?.cod_etape ?? ''}
              {...register('callbackData.cod_etape')}
            />
          </div>

          <div>
            <FormLabel htmlFor="callbackData-cod_process">
              cod_process
            </FormLabel>

            <Input
              id="callbackData-cod_process"
              defaultValue={data?.callbackData?.cod_process ?? ''}
              {...register('callbackData.cod_process')}
            />
          </div>

          <div>
            <FormLabel htmlFor="callbackData-cod_tache">cod_tache</FormLabel>

            <Input
              id="callbackData-cod_tache"
              defaultValue={data?.callbackData?.cod_tache ?? ''}
              {...register('callbackData.cod_tache')}
            />
          </div>

          <div>
            <FormLabel htmlFor="callbackData-comment">comment</FormLabel>

            <Input
              id="callbackData-comment"
              defaultValue={data?.callbackData?.comment ?? ''}
              {...register('callbackData.comment')}
            />
          </div>

          <div>
            <FormControl gridGap="5px" display="flex" alignItems="center">
              <Switch
                id="callbackData-ferme"
                defaultChecked={data?.callbackData?.ferme ?? false}
                {...register('callbackData.ferme')}
              />

              <FormLabel m={0} htmlFor="callbackData-ferme">
                ferme
              </FormLabel>
            </FormControl>
          </div>

          <div>
            <FormLabel htmlFor="callbackData-num_dos">num_dos</FormLabel>

            <Input
              id="callbackData-num_dos"
              defaultValue={data?.callbackData?.num_dos ?? ''}
              {...register('callbackData.num_dos')}
            />
          </div>

          <div>
            <FormLabel htmlFor="callbackData-codeQualification">
              codeQualification
            </FormLabel>

            <Input
              id="callbackData-codeQualification"
              defaultValue={data?.callbackData?.codeQualification ?? ''}
              {...register('callbackData.codeQualification')}
            />
          </div>

          <div>
            <FormLabel htmlFor="callbackData-documents">documents</FormLabel>

            <Input
              id="callbackData-documents"
              defaultValue={data?.callbackData?.documents ?? ''}
              {...register('callbackData.documents')}
            />
          </div>

          <div>
            <FormLabel htmlFor="callbackData-numDos">numDos</FormLabel>

            <Input
              id="callbackData-numDos"
              defaultValue={data?.callbackData?.numDos ?? ''}
              {...register('callbackData.numDos')}
            />
          </div>

          <div>
            <FormLabel htmlFor="callbackData-typeDocument">
              typeDocument
            </FormLabel>

            <Input
              id="callbackData-typeDocument"
              defaultValue={data?.callbackData?.typeDocument ?? ''}
              {...register('callbackData.typeDocument')}
            />
          </div>
        </div>
      </FormControl>

      {false && (
        <FormControl>
          <FormLabel id="callbackDataTransform">
            callbackDataTransform
          </FormLabel>

          <Select
            id="callbackDataTransform"
            options={[]}
            defaultValue={data.callbackDataTransform.map(value => ({
              id: value,
              label: value
            }))}
            {...register('callbackDataTransform')}
          />
        </FormControl>
      )}

      <Button ref={submitRef} style={{ display: 'none' }} type="submit">
        Enregistrer
      </Button>
    </form>
  );
};

const Footer = ({ id }) => {
  const submitRef = useRecoilValue($submit);

  return (
    <Button
      onClick={() => {
        submitRef.click();
      }}
    >
      Enregistrer
    </Button>
  );
};

NotificationModal.Footer = Footer;
export default NotificationModal;
