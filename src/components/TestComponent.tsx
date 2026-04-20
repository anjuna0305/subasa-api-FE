"use client";

import { Box, Button, Typography } from "@mui/material";
import { useActionState } from "react";

const increaseState = (prev: number) => {
  return prev + 2;
};

export default function TestComponent() {
  const [state, dispatchAction, isPending] = useActionState<number>(
    async (prev) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return increaseState(prev);
    },
    0,
  );

  const startTransition = () => dispatchAction();
  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        {state}
      </Typography>

      <Button disabled={isPending} onClick={startTransition}>
        call the dispatch action
      </Button>
    </Box>
  );
}
