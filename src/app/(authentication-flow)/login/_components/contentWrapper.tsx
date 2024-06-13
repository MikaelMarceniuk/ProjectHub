import withChildren from '@/@types/withChildren'

const ContentWrapper: React.FC<withChildren> = ({ children }) => {
	return <div className='mt-40 flex w-80 flex-1 flex-col'>{children}</div>
}

export default ContentWrapper
