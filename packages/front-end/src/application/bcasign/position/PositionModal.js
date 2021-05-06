import { useRecoilValue } from 'recoil';
import { useForm } from 'react-hook-form';
import { DeleteIcon, AddIcon } from '@chakra-ui/icons';

import {
  /*Switch,*/ FormControl,
  FormLabel,
  IconButton
} from '@chakra-ui/react';

import { $position } from 'states';
import { Input, Button } from 'layout';

const PositionModal = ({ codeCourrier }) => {
  const data = useRecoilValue($position.read(codeCourrier));
  const { register, handleSubmit } = useForm();

  const onSubmit = fields => {
    debugger;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl id="codeCourrier">
        <FormLabel>codeCourrier</FormLabel>
        <Input defaultValue={data.codeCourrier} {...register('codeCourrier')} />
      </FormControl>

      <section>
        {data?.positions?.map(position => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={() => {}} icon={<DeleteIcon />} />

            <FormControl id="position-rank">
              <FormLabel>rank</FormLabel>
              <Input
                defaultValue={position.rank}
                {...register('positions' + position.rank)}
              />
            </FormControl>

            <FormControl id="position-page">
              <FormLabel>page</FormLabel>
              <Input
                defaultValue={position.page}
                {...register('positions' + position.page)}
              />
            </FormControl>

            <FormControl id="position-x">
              <FormLabel>x</FormLabel>
              <Input
                defaultValue={position.x}
                {...register('positions' + position.x)}
              />
            </FormControl>

            <FormControl id="position-y">
              <FormLabel>y</FormLabel>
              <Input
                defaultValue={position.y}
                {...register('positions' + position.y)}
              />
            </FormControl>

            <FormControl id="position-height">
              <FormLabel>height</FormLabel>
              <Input
                defaultValue={position.height}
                {...register('positions' + position.height)}
              />
            </FormControl>

            <FormControl id="position-width">
              <FormLabel>width</FormLabel>
              <Input
                defaultValue={position.width}
                {...register('positions' + position.width)}
              />
            </FormControl>
          </div>
        ))}
      </section>

      <Button onClick={() => {}} leftIcon={<AddIcon />} variant="solid">
        Ajouter un client
      </Button>

      <Button type="submit">Enregistrer</Button>
    </form>
  );
};

export default PositionModal;
