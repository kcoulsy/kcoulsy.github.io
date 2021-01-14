import React from 'react';
import { ProductColor } from '../types';

interface FilterProps {
    onSelect: (value: ProductColor) => void;
}

const Filter: React.FC<FilterProps> = ({ onSelect }) => {
    const options = Object.values(ProductColor);

    return (
        <div data-test="component-filter">
            <select
                onChange={(ev) => onSelect(ev.target.value as ProductColor)}
                data-test="filter-select"
            >
                {options.map((colour) => (
                    <option
                        key={colour}
                        value={colour}
                        data-test="filter-option"
                    >
                        {colour}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Filter;
