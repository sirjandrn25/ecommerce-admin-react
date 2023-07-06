const Loading = ({ message }: { message: string }) => {
    return (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center h-full bg-white opacity-40 ">
            <span className="loading loading-spinner loading-lg"></span>
            <div className="text-xl">{message} </div>
        </div>
    )
}

export default Loading