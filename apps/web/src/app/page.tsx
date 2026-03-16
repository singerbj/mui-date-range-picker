"use client";

import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Stack,
  Paper,
  Chip,
  Divider,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { DateRangePicker, DateRangePickerInput, DateRange } from "@mui-date-range-picker/react";

export default function Home() {
  const [range, setRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  const [inputRange, setInputRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom>
        MUI Date Range Picker
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        A React date range picker component built with Material UI.
      </Typography>

      <Stack spacing={6}>
        <Box>
          <Typography variant="h5" gutterBottom>
            Inline Calendar
          </Typography>
          <DateRangePicker
            value={range}
            onChange={setRange}
            showActions
            onApply={(r) => console.log("Applied:", r)}
            onClear={() => console.log("Cleared")}
          />
          {range.startDate && range.endDate && (
            <Typography sx={{ mt: 2 }}>
              Selected: {range.startDate.format("YYYY-MM-DD")} to{" "}
              {range.endDate.format("YYYY-MM-DD")}
            </Typography>
          )}
        </Box>

        <Box>
          <Typography variant="h5" gutterBottom>
            Input with Popover
          </Typography>
          <DateRangePickerInput
            value={inputRange}
            onChange={setInputRange}
            label="Date Range"
            fullWidth
          />
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Pricing Section */}
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" gutterBottom fontWeight={700}>
            Enterprise License
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: 600, mx: "auto" }}
          >
            Get unrestricted access to the full source code, direct support from the maintainers,
            and everything you need to ship with confidence.
          </Typography>

          <Paper
            elevation={6}
            sx={{
              maxWidth: 480,
              mx: "auto",
              p: 4,
              borderRadius: 3,
              border: "2px solid",
              borderColor: "primary.main",
              position: "relative",
              overflow: "visible",
            }}
          >
            <Chip
              label="One-Time Payment"
              color="primary"
              size="small"
              sx={{
                position: "absolute",
                top: -14,
                left: "50%",
                transform: "translateX(-50%)",
                fontWeight: 600,
              }}
            />

            <Typography variant="h3" fontWeight={800} sx={{ mt: 1, mb: 0.5 }}>
              $250,000
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              One-time license fee — no recurring costs, ever.
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <List dense disablePadding>
              {[
                "Full source code access with perpetual license",
                "Priority support with 4-hour SLA response time",
                "Private Slack channel with the core team",
                "Custom feature development (up to 40 hours/year)",
                "Early access to all future releases and beta features",
                "Architecture review and integration consulting",
                "White-label and redistribution rights",
                "On-site training session (up to 2 days)",
              ].map((item) => (
                <ListItem key={item} disableGutters sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleIcon color="success" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={item} primaryTypographyProps={{ variant: "body2" }} />
                </ListItem>
              ))}
            </List>

            <Button
              variant="contained"
              size="large"
              fullWidth
              sx={{ mt: 3, py: 1.5, fontWeight: 700, fontSize: "1rem" }}
              onClick={() => window.open("mailto:sales@mui-date-range-picker.com", "_blank")}
            >
              Contact Sales
            </Button>

            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }}>
              Includes a 30-day evaluation period with full refund guarantee.
            </Typography>
          </Paper>
        </Box>
      </Stack>
    </Container>
  );
}
