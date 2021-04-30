import { useRecoilValue } from 'recoil';
import { useForm } from 'react-hook-form';
import { /*Switch,*/ FormControl, FormLabel } from '@chakra-ui/react';

import { $position } from 'states';
import { Input, Button, Switch } from 'layout';

const PositionModal = ({ codeCourrier }) => {
  const data = useRecoilValue($position.read(codeCourrier));

  const { register, handleSubmit } = useForm();

  const onSubmit = fields => {
    console.log(fields);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl id="codeCourrier">
        <FormLabel>codeCourrier</FormLabel>
        <Input defaultValue={data.codeCourrier} {...register('codeCourrier')} />
      </FormControl>

      <FormControl id="positions">
        <FormLabel>positions</FormLabel>
        <Input
          defaultValue={JSON.stringify(data.positions)}
          {...register('positions')}
        />
      </FormControl>

      <Button type="submit">Enregistrer</Button>
    </form>
  );
};

export default PositionModal;
