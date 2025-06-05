type CalorieDisplayProps = {
    calories: number,
    text: string
}

export default function CalorieDisplay({calories, text}: CalorieDisplayProps) {
    return (
        <>
            <p className="text-2xl font-bold text-center text-white rounded-full grid grid-cols-1 gap-3">
                <span className="text-6xl font-black text-orange">
                    {calories}
                </span>
                {text}
            </p>
        </>
    )
}
