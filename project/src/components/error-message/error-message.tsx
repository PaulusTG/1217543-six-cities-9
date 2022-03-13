import { useAppSelector } from '../../hooks';

function ErrorMessage(): JSX.Element | null {
  const { error } = useAppSelector((state) => state);

  return error ?
    <div
      style={{
        position: 'fixed',
        top: '30px',
        right: '30px',
        padding: '10px',
        backgroundColor: '#d96666',
        color: 'white',
        borderRadius: '5px',
      }}
    >
      {error}
    </div>
    : null;
}

export default ErrorMessage;
