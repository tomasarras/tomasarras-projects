import Link from 'next/link'

const SpanishButton = () => {
  return (
    <Link className='flex sm:w-full' href={"/es"}><span className="fi fi-es me-2"></span> Español</Link>
  )
}

export default SpanishButton