function FormField({ label, type="text", placeholder, onChange }) {
    return (
        <div className="flex items-center space-x-4">
            <label htmlFor={label} className="text-sm font-medium text-center w-12">
                {label.charAt(0).toUpperCase()+ label.slice(1)}
            </label>
            <input 
                spellCheck={true}
                onChange={onChange}
                type={type}
                name={label} 
                id={label} 
                className="w-full"
                placeholder={placeholder}
            />
        </div>
    );
}

export default FormField;