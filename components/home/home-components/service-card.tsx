import Link from 'next/link';

interface ServiceCardProps {
  text: string;
  color: string;
  link: string;
  Icon: any;
}

const ServiceCard = ({
  text,
  color,
  link,
  Icon
}: ServiceCardProps) => {
  return (
    <Link href={link} className='flex gap-2 flex-col justify-center items-center px-5 py-8 bg-white rounded-md shadow-md hover:bg-teal-300 transition duration-300 cursor-pointer hover:scale-105 border border-gray-200'>
      <div className={`${color}`}>
      <Icon size={30} />
      </div>
      <h1 className='text-lg font-semibold'>{text}</h1>
    </Link>
  )
}

export default ServiceCard