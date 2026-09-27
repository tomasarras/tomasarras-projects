import Link from 'next/link'

const EnglishButton = () => {
  return (
    <Link className='flex sm:w-full as-text' href={"/en"}>English</Link>
  )
}

export default EnglishButton