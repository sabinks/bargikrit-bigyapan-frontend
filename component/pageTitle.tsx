export default function PageTitle({ title }: { title: string }) {
  return (
    <div className='max-w-full'>
      <h1 className='text-xl md:text-2xl font-semibold text-gray-900'>{title}</h1>
    </div>
  );
}
