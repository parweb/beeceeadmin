import { useRecoilValue } from 'recoil';
import { useForm } from 'react-hook-form';
import { Tr, Td, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import slugify from 'slugify';

import { useMutation } from 'hooks';
import { $service } from 'states';
import { Input } from 'layout';

const ServiceItem = ({ environnement, id }) => {
  const { name, url } = useRecoilValue($service.read(id));
  const [updateService] = useMutation($service.update(id));
  const [removeService] = useMutation($service.remove(id));

  const {
    handleSubmit,
    register
    // formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async ({ name, url }) => {
    try {
      await updateService({ name, url });
    } catch (e) {}
  };

  const fields = {
    name: register('name'),
    url: register('url')
  };

  return (
    <Tr>
      <Td w="40px">
        <IconButton onClick={removeService} icon={<DeleteIcon />} />
      </Td>
      <Td>
        <Input
          defaultValue={name}
          {...fields.name}
          onChange={async e => {
            e.target.value = slugify(e.target.value);

            await fields.name.onChange(e);
            handleSubmit(onSubmit)();
          }}
        />
        {/*<Input name="name" value={fields.name ?? ''} onChange={onChange} />*/}
      </Td>
      <Td>
        <Input
          defaultValue={url}
          {...fields.url}
          onChange={async e => {
            await fields.url.onChange(e);
            handleSubmit(onSubmit)();
          }}
        />
        {/*<Input name="url" value={fields.url ?? ''} onChange={onChange} />*/}
      </Td>
    </Tr>
  );
};

export default ServiceItem;
