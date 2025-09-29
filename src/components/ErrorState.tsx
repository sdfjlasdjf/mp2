export default function ErrorState({ message='Something went wrong.' }: {message?: string}){
  return (
    <div role="alert" style={{padding:'1rem', color:'var(--danger)'}}>
      {message}
    </div>
  );
}
