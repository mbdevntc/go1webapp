export const Slider = ({ label, value, onChange }) => {

    return (
        <div>
            <input type="range" className="slider" min={0} max={1} step={0.05} value={value} onChange={onChange} />
            <div className="slider-value">{label} {Math.floor(value * 100, 0)}%</div>
        </div>
    )
}