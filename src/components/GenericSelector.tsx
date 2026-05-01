"use client";

import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Box } from "@mui/system";
import { use, useEffect, useState } from "react";

interface GenericSelectorProps<T> {
  selected?: T;
  onSelect: (item: T) => void;
  loader: () => Promise<T[]>;
  getKey: (item: T) => string;
  getLabel: (item: T) => string;
  getValue: (item: T) => string;
  defaultSelect?: T;
}

export default function GenericSelector<T>({
  selected,
  onSelect,
  loader,
  getKey,
  getLabel,
  getValue,
  defaultSelect,
}: GenericSelectorProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const found = items.find((item) => getValue(item) === event.target.value);
    if (!found) return;
    onSelect(found);
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await loader();
      setItems(data);
      setLoading(false);
    };
    load();
  }, [loader]);

  useEffect(() => {
    if (defaultSelect && getKey(defaultSelect)) {
      onSelect(defaultSelect);
    }
  }, [items, onSelect, getKey, defaultSelect]);

  return (
    <Box sx={{ width: "100%", px: 2 }}>
      <Select
        disabled={loading}
        variant="standard"
        disableUnderline
        value={selected ? getValue(selected) : ""}
        onChange={handleChange}
      >
        {items.map((item) => (
          <MenuItem key={getKey(item)} value={getValue(item)}>
            {getLabel(item)}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
