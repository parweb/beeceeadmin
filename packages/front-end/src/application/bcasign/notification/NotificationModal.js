import { useRecoilValue } from 'recoil';
import { useForm } from 'react-hook-form';
import { /*Switch,*/ FormControl, FormLabel } from '@chakra-ui/react';

import { $notification } from 'states';
import { Input, Button, Switch } from 'layout';

const NotificationModal = ({ code }) => {
  const data = useRecoilValue($notification.read(code));

  const { register, handleSubmit } = useForm();

  const onSubmit = fields => {
    console.log(fields);
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
        <Input
          defaultValue={JSON.stringify(data.callbackData)}
          {...register('callbackData')}
        />
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
