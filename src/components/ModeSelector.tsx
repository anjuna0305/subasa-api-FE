import { Box, MenuItem, Select } from "@mui/material";

type Model = {
  id: number;
  displayName: string;
  modelName: string;
};

const models: Model[] = [
  {
    id: 1,
    displayName: "model 1",
    modelName: "model1.10",
  },
  {
    id: 2,
    displayName: "model 2",
    modelName: "model2.20",
  },
  {
    id: 3,
    displayName: "model 3",
    modelName: "model3.30",
  },
];

export default function ModeSelector() {
  return (
    <Box
      sx={{
        width: "100%",
        px: 2,
      }}
    >
      <Select
        variant="standard"
        disableUnderline
        labelId="selected-model-label"
        id="selected-model-id"
        value={model.modelName}
        onChange={handleModelChange}
      >
        {models.map((m) => (
          <MenuItem key={m.id} value={m.modelName}>
            {m.displayName}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
