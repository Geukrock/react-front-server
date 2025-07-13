import { useState, useEffect } from "react";
import Dropdown from "./Dropdown";

type SelectorItem = {
    initialLabel: string;
    label: string;
    options: string[];
};

type Props = {
    items: SelectorItem[];
    onComplete?: (selections: Record<string, string>[]) => void;
};

export default function ProductSelector({ items, onComplete }: Props) {
    const [selections, setSelections] = useState<Record<string, string>>({});
    const [selectedItems, setSelectedItems] = useState<Record<string, string>[]>([]);
    const [resetCounter, setResetCounter] = useState(0);

    const allSelected = items.every((item) => selections[item.label]);

    const handleSelect = (label: string, value: string) => {
        setSelections((prev) => ({
            ...prev,
            [label]: value,
        }));
    };

    useEffect(() => {
        if (allSelected) {
            setSelectedItems((prev) => [...prev, selections]);
            setSelections({});
            setResetCounter((prev) => prev + 1);
        }
    }, [allSelected, selections]);

    useEffect(() => {
        if (selectedItems.length > 0) {
            onComplete?.(selectedItems);
        }
    }, [selectedItems, onComplete]);

    return (
        <div>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                {items.map((item) => (
                    <Dropdown
                        key={item.label + resetCounter}
                        initialLabel={item.initialLabel}
                        label={item.label}
                        options={item.options}
                        selectedValue={selections[item.label] ?? item.initialLabel}
                        onSelect={handleSelect}
                    />
                ))}
            </div>
        </div>
    );
}
