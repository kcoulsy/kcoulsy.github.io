import React from 'react';

import { ProductColor } from '../types';

/**
 * I wanted to make this a generic filter component
 * but decided to hardcode it to colours because of time
 */

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
                className="text-xl pt-1"
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
