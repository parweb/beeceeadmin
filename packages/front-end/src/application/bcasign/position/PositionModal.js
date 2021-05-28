import { useRecoilValue } from 'recoil';
import { useForm } from 'react-hook-form';
import { DeleteIcon, AddIcon } from '@chakra-ui/icons';
import { FormControl, FormLabel, IconButton } from '@chakra-ui/react';

import { $position } from 'states';
import { Input, Button } from 'layout';
import { useMutation, useConfirmation, useToast } from 'hooks';

const PositionRank = ({ data, position, i, isDefault, register }) => {
  const [updatePosition] = useMutation($position.update(data.codeCourrier));
  const { addToast } = useToast();

  const onDone = () => {
    try {
      updatePosition({
        codeCourrier: data.codeCourrier,
        positions: data.positions.filter((_, j) => j !== i)
      });

      addToast({
        type: 'success',
        heading: `La ligne a été supprimé avec succès.`
      });
    } catch (e) {
      addToast({
        type: 'error',
        heading: `Echec de la suppression.`
      });
    }
  };

  const removeConfirmation = useConfirmation({
    onDone,
    heading: 'Confirmation suppression',
    message: `Voulez-vous supprimer la ligne ?`
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {!isDefault && (
        <IconButton onClick={removeConfirmation} icon={<DeleteIcon />} />
      )}

      <FormControl id="position-rank">
        <FormLabel>rank</FormLabel>
        <Input
          defaultValue={position?.rank}
          {...register(`positions[${i}].rank`)}
        />
      </FormControl>

      <FormControl id="position-page">
        <FormLabel>page</FormLabel>
        <Input
          defaultValue={position?.page}
          {...register(`positions[${i}].page`)}
        />
      </FormControl>

      <FormControl id="position-x">
        <FormLabel>x</FormLabel>
        <Input defaultValue={position?.x} {...register(`positions[${i}].x`)} />
      </FormControl>

      <FormControl id="position-y">
        <FormLabel>y</FormLabel>
        <Input defaultValue={position?.y} {...register(`positions[${i}].y`)} />
      </FormControl>

      <FormControl id="position-height">
        <FormLabel>height</FormLabel>
        <Input
          defaultValue={position?.height}
          {...register(`positions[${i}].height`)}
        />
      </FormControl>

      <FormControl id="position-width">
        <FormLabel>width</FormLabel>
        <Input
          defaultValue={position?.width}
          {...register(`positions[${i}].width`)}
        />
      </FormControl>
    </div>
  );
};

const PositionModal = ({ codeCourrier }) => {
  const data = useRecoilValue($position.readWidthDefault(codeCourrier));
  const [updatePosition] = useMutation($position.update(codeCourrier));
  const { register, handleSubmit } = useForm();

  const isDefault = codeCourrier === 'default';

  const onSubmit = fields => {
    updatePosition({
      codeCourrier: fields.codeCourrier,
      positions: (fields?.positions ?? []).map(
        ({ height, page, rank, width, x, y }) => ({
          height: parseInt(height) || null,
          page: parseInt(page),
          rank: parseInt(rank),
          width: parseInt(width) || null,
          x: parseFloat(x),
          y: parseFloat(y)
        })
      )
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl id="codeCourrier">
        <FormLabel>codeCourrier</FormLabel>
        <Input
          disabled={isDefault}
          defaultValue={data.codeCourrier}
          {...register('codeCourrier')}
        />

        {isDefault && (
          <Input
            type="hidden"
            defaultValue={data.codeCourrier}
            {...register('codeCourrier')}
          />
        )}
      </FormControl>

      <section>
        {data?.positions?.map((position, i) => (
          <PositionRank
            key={`PositionRank-${i}`}
            isDefault={isDefault}
            register={register}
            i={i}
            data={data}
            position={position}
          />
        ))}
      </section>

      {!isDefault && (
        <Button
          onClick={() => {
            updatePosition({
              codeCourrier: data.codeCourrier,
              positions: [...(data?.positions ?? []), {}]
            });
          }}
          leftIcon={<AddIcon />}
          variant="solid"
        >
          Ajouter une position
        </Button>
      )}
    </form>
  );
};

const Footer = () => {
  return 'ploppl';
};

PositionModal.Footer = Footer;
export default PositionModal;
