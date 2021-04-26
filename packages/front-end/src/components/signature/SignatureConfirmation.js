import {
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle
} from 'react';

import { useRecoilState } from 'recoil';
import { DragSource, DropTarget, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';

import {
  MediaObject,
  Icon,
  ScopedNotification
} from '@salesforce/design-system-react';

import { WarningGe } from 'components/layout';
import { getName } from 'helpers';
import { $roleSelected } from 'state';

import { useRecoilValue } from 'recoil';
import { $courriers, $documentsCourriers } from 'state';

const SelectCodeCourrier = ({ document }) => {
  const courriers = useRecoilValue($courriers);
  const [documentsCourriers, setDocumentsCourriers] = useRecoilState(
    $documentsCourriers
  );

  useEffect(() => {
    setDocumentsCourriers(state => ({
      ...state,
      [document.idDocNum]: '0'
    }));

    return () => {
      setDocumentsCourriers(state =>
        Object.entries(state)
          .filter(([key, value]) => {
            return parseInt(key) !== document.idDocNum;
          })
          .reduce((carry, [key, value]) => ({ ...carry, [key]: value }), {})
      );
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <select
      style={{ float: 'right' }}
      onChange={e => {
        setDocumentsCourriers(state => ({
          ...state,
          [document.idDocNum]: e.target.value
        }));
      }}
    >
      {[
        { id: '0', name: 'Code Courrier' },
        ...(courriers?.data?.courriers ?? [])
      ]?.map(({ id, name }) => (
        <option
          key={id}
          value={id}
          selected={documentsCourriers[document.idDocNum] === id ? true : false}
        >
          {name}
        </option>
      ))}
    </select>
  );
};

const SignatoryTarget = forwardRef(
  ({ role, index, isDragging, connectDragSource, connectDropTarget }, ref) => {
    const elementRef = useRef(null);

    connectDragSource(elementRef);
    connectDropTarget(elementRef);

    const opacity = isDragging ? 0 : 1;

    useImperativeHandle(ref, () => ({
      getNode: () => elementRef.current
    }));

    return (
      <div
        ref={elementRef}
        style={{
          padding: '5px',
          border: '1px solid #797979',
          borderRadius: '4px',
          marginBottom: '10px',
          opacity
        }}
      >
        <MediaObject
          body={
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <span
                  style={{
                    display: 'block',
                    fontSize: '15px',
                    color: '#000'
                  }}
                >
                  {role.Titre} {role.Name}
                </span>

                <span
                  style={{
                    display: 'block',
                    fontSize: '12px',
                    color: '#444'
                  }}
                >
                  {role.Role}
                </span>

                <span
                  style={{
                    display: 'block',
                    fontSize: '10px',
                    color: '#777'
                  }}
                >
                  {role.Email}
                </span>
                <span
                  style={{
                    display: 'block',
                    fontSize: '10px',
                    color: '#777'
                  }}
                >
                  {role.Phone}
                </span>
              </div>
              <span
                style={{
                  fontSize: '25px',
                  fontWeight: 'bold'
                }}
              >
                {index + 1}
              </span>
            </div>
          }
          figure={<Icon category="standard" name="user" size="large" />}
          verticalCenter
        />
      </div>
    );
  }
);

const Signatory = DropTarget(
  'ItemTypes.Signatory',
  {
    hover(props, monitor, component) {
      if (!component) {
        return null;
      }

      const node = component.getNode();
      if (!node) {
        return null;
      }

      const dragIndex = monitor.getItem().index;
      const hoverIndex = props.index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = node.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      props.moveRoles(dragIndex, hoverIndex);
      monitor.getItem().index = hoverIndex;
    }
  },
  connect => ({
    connectDropTarget: connect.dropTarget()
  })
)(
  DragSource(
    'ItemTypes.Signatory',
    {
      beginDrag: props => ({
        id: props.id,
        index: props.index
      })
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    })
  )(SignatoryTarget)
);

const SignatureConfirmation = ({ documents = [] }) => {
  const [roles, setRoles] = useRecoilState($roleSelected);

  const moveRoles = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRoles = roles[dragIndex];
      setRoles(
        update(roles, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRoles]
          ]
        })
      );
    },
    [roles, setRoles]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <WarningGe />

        {roles.length <= 1 ? (
          <strong>Destinataire</strong>
        ) : (
          <strong>Destinataires</strong>
        )}

        {roles.length > 1 && (
          <div style={{ margin: '10px 0' }}>
            <ScopedNotification theme="light">
              L'ordre des destinataires est important
            </ScopedNotification>
          </div>
        )}

        {roles.map((role, index) => (
          <Signatory
            key={role.id}
            index={index}
            role={role}
            moveRoles={moveRoles}
          />
        ))}

        <strong>Les documents suivants sont prêts pour envoi</strong>
        <ul
          style={{
            paddingLeft: '20px',
            margin: '20px 0',
            marginTop: '0px'
          }}
        >
          {documents.map(item => (
            <li key={item.idDocNum}>
              {getName(item.typeDocument, item.codeQualification).label}
              {` (n° ${item.idDocNum})`}

              <SelectCodeCourrier document={item} />
            </li>
          ))}
        </ul>
      </div>
    </DndProvider>
  );
};

export default SignatureConfirmation;
