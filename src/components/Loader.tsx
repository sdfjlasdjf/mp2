export default function Loader({ label='Loading...' }: {label?: string}){
  return (
    <div role="status" aria-live="polite" style={{padding:'1rem'}}>
      {label}
    </div>
  );
}
