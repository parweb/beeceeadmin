import { useRecoilValue } from 'recoil';
import { useForm } from 'react-hook-form';
import { /*Switch,*/ Flex, FormControl, FormLabel } from '@chakra-ui/react';

import { $notification } from 'states';
import { Input, Button, Switch } from 'layout';

const NotificationModal = ({ code }) => {
  const data = useRecoilValue($notification.read(code));
  console.log({ data });

  const { register, handleSubmit } = useForm();

  const onSubmit = fields => {
    console.log({ fields });
    const data = {
      ...fields,
      callbackDataTransform: JSON.parse(fields.callbackDataTransform)
    };
    debugger;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl id="code">
        <FormLabel>code</FormLabel>
        <Input defaultValue={data.code} {...register('code')} />
      </FormControl>

      <FormControl id="description">
        <FormLabel>description</FormLabel>
        <Input defaultValue={data.description} {...register('description')} />
      </FormControl>

      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="auto" mb="0">
          auto
        </FormLabel>

        <Switch id="auto" value={data.auto} />
      </FormControl>

      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="messagePerDoc" mb="0">
          messagePerDoc
        </FormLabel>

        <Switch id="messagePerDoc" value={data.messagePerDoc} />
      </FormControl>

      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="notifyReception" mb="0">
          notifyReception
        </FormLabel>

        <Switch id="notifyReception" value={data.notifyReception} />
      </FormControl>

      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="notifyResponse" mb="0">
          notifyResponse
        </FormLabel>

        <Switch id="notifyResponse" value={data.notifyResponse} />
      </FormControl>

      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="successOnly" mb="0">
          successOnly
        </FormLabel>

        <Switch id="successOnly" value={data.successOnly} />
      </FormControl>

      <FormControl id="callbackUrl">
        <FormLabel>callbackUrl</FormLabel>
        <Input defaultValue={data.callbackUrl} {...register('callbackUrl')} />
      </FormControl>

      <FormControl id="callbackDataType">
        <FormLabel>callbackDataType</FormLabel>
        <Input
          defaultValue={data.callbackDataType}
          {...register('callbackDataType')}
        />
      </FormControl>

      <FormControl id="callbackResponseHandler">
        <FormLabel>callbackResponseHandler</FormLabel>
        <Input
          defaultValue={data.callbackResponseHandler}
          {...register('callbackResponseHandler')}
        />
      </FormControl>

      <FormControl id="callbackResponseHandlerParams">
        <FormLabel>callbackResponseHandlerParams</FormLabel>
        <Input
          defaultValue={data.callbackResponseHandlerParams?.url ?? ''}
          {...register('callbackResponseHandlerParams.url')}
        />
      </FormControl>

      <FormControl id="username">
        <FormLabel>username</FormLabel>
        <Input defaultValue={data.username} {...register('username')} />
      </FormControl>

      <FormControl id="password">
        <FormLabel>password</FormLabel>
        <Input defaultValue={data.password} {...register('password')} />
      </FormControl>

      <FormControl id="authMethod">
        <FormLabel>authMethod</FormLabel>
        <Input defaultValue={data.authMethod} {...register('authMethod')} />
      </FormControl>

      <FormControl id="callbackRequiredParams">
        <FormLabel>callbackRequiredParams</FormLabel>
        <Input
          defaultValue={data.callbackRequiredParams}
          {...register('callbackRequiredParams')}
        />
      </FormControl>

      <FormControl id="callbackData">
        <FormLabel>callbackData</FormLabel>

        <div>
          <div>
            <FormLabel>cod_etape</FormLabel>
            <Input
              defaultValue={data?.callbackData?.cod_etape ?? ''}
              {...register('callbackData.cod_etape')}
            />
          </div>
          <div>
            <FormLabel>cod_process</FormLabel>
            <Input
              defaultValue={data?.callbackData?.cod_process ?? ''}
              {...register('callbackData.cod_process')}
            />
          </div>
          <div>
            <FormLabel>cod_tache</FormLabel>
            <Input
              defaultValue={data?.callbackData?.cod_tache ?? ''}
              {...register('callbackData.cod_tache')}
            />
          </div>
          <div>
            <FormLabel>comment</FormLabel>
            <Input
              defaultValue={data?.callbackData?.comment ?? ''}
              {...register('callbackData.comment')}
            />
          </div>
          <div>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="notifyResponse" mb="0">
                ferme
              </FormLabel>

              <Switch
                id="notifyResponse"
                {...register('callbackData.ferme')}
                value={data?.callbackData?.ferme ?? false}
              />
            </FormControl>
          </div>
          <div>
            <FormLabel>num_dos</FormLabel>
            <Input
              defaultValue={data?.callbackData?.num_dos ?? ''}
              {...register('callbackData.num_dos')}
            />
          </div>
        </div>
      </FormControl>

      <FormControl id="callbackDataTransform">
        <FormLabel>callbackDataTransform</FormLabel>
        <Input
          defaultValue={JSON.stringify(data.callbackDataTransform)}
          {...register('callbackDataTransform')}
        />
      </FormControl>

      <Button type="submit">Enregistrer</Button>
    </form>
  );
};

export default NotificationModal;
