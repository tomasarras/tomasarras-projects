import Link from 'next/link'

const EnglishButton = () => {
  return (
    <Link className='flex sm:w-full as-text' href={"/en"}><span className="fi fi-gb me-2"></span>English</Link>
  )
}

export default EnglishButton