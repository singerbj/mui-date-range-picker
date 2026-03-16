"use client";

import { useState, useEffect, useRef } from "react";
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
  IconButton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { DateRangePicker, DateRangePickerInput, DateRange } from "@indexlabs/mui-date-range-picker";
import * as motion from "motion/react-client";
import { useColorMode } from "@/components/ThemeProvider";

function GlowOrb({
  color,
  size,
  top,
  left,
  delay,
}: {
  color: string;
  size: number;
  top: string;
  left: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.2, 1] }}
      transition={{ duration: 6, repeat: Infinity, delay, ease: "easeInOut" }}
      style={{
        position: "absolute",
        top,
        left,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: "blur(40px)",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

export default function Home() {
  const { mode, toggleColorMode } = useColorMode();
  const isDark = mode === "dark";

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const [range, setRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  const [inputRange, setInputRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  // Theme-aware colors
  const textPrimary = isDark ? "#fff" : "#1a1a2e";
  const textSecondary = isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)";
  const textTertiary = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";
  const textMuted = isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)";
  const textSubtle = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";
  const textBody = isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)";
  const borderColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const borderLight = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const borderChip = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)";
  const chipText = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)";
  const surfaceBg = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)";
  const surfaceCard = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";
  const codeBg = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)";
  const pageBg = isDark ? "#0a0e1a" : "#f5f7fa";
  const gradientText = isDark
    ? "linear-gradient(135deg, #fff 0%, #90caf9 50%, #ce93d8 100%)"
    : "linear-gradient(135deg, #1a1a2e 0%, #1976d2 50%, #9c27b0 100%)";
  const codeAccent = isDark ? "#90caf9" : "#1976d2";

  return (
    <Box
      ref={containerRef}
      sx={{ position: "relative", overflow: "hidden", minHeight: "100vh", bgcolor: pageBg }}
    >
      {/* Mouse-reactive background glow */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, ${
            isDark ? "rgba(25, 118, 210, 0.12)" : "rgba(25, 118, 210, 0.07)"
          }, transparent 40%)`,
          transition: "background 0.15s ease",
        }}
      />

      {/* Background glow orbs */}
      <GlowOrb color="#1976d2" size={600} top="-10%" left="-5%" delay={0} />
      <GlowOrb color="#9c27b0" size={500} top="20%" left="70%" delay={2} />
      <GlowOrb color="#1976d2" size={400} top="60%" left="30%" delay={4} />
      <GlowOrb color="#9c27b0" size={350} top="80%" left="80%" delay={1} />

      {/* Dark/Light mode toggle - top right */}
      <IconButton
        onClick={toggleColorMode}
        sx={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 10,
          bgcolor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
          color: textPrimary,
          backdropFilter: "blur(10px)",
          "&:hover": {
            bgcolor: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)",
          },
        }}
      >
        {isDark ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>

      <Container maxWidth="lg" sx={{ py: 8, position: "relative", zIndex: 1 }}>
        <Stack spacing={10}>
          {/* Hero Section */}
          <Box sx={{ textAlign: "center", pt: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Chip
                label="Built with Material UI"
                variant="outlined"
                sx={{
                  mb: 3,
                  borderColor: borderChip,
                  color: chipText,
                  fontWeight: 500,
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            >
              <Typography
                variant="h2"
                fontWeight={800}
                sx={{
                  color: textPrimary,
                  mb: 2,
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  background: gradientText,
                  backgroundSize: "200% 200%",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "glowPulse 3s ease-in-out infinite, gradientShift 4s ease-in-out infinite",
                  "@keyframes glowPulse": {
                    "0%, 100%": {
                      filter: `drop-shadow(0 0 8px ${isDark ? "rgba(144, 202, 249, 0.4)" : "rgba(25, 118, 210, 0.3)"})`,
                    },
                    "50%": {
                      filter: `drop-shadow(0 0 20px ${isDark ? "rgba(206, 147, 216, 0.6)" : "rgba(156, 39, 176, 0.4)"}) drop-shadow(0 0 40px ${isDark ? "rgba(144, 202, 249, 0.3)" : "rgba(25, 118, 210, 0.2)"})`,
                    },
                  },
                  "@keyframes gradientShift": {
                    "0%, 100%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                  },
                }}
              >
                MUI Date Range Picker
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: textSecondary,
                  maxWidth: 600,
                  mx: "auto",
                  fontWeight: 400,
                  lineHeight: 1.6,
                }}
              >
                A production-ready date range picker built on Material UI. Dual calendars, preset
                ranges, and seamless theme integration.
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
            >
              <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    py: 1.5,
                    px: 4,
                    fontWeight: 700,
                    borderRadius: 2,
                    boxShadow: "0 0 20px rgba(25, 118, 210, 0.4)",
                  }}
                  onClick={() => {
                    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  View Demo
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    py: 1.5,
                    px: 4,
                    fontWeight: 700,
                    borderRadius: 2,
                    borderColor: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
                    color: textPrimary,
                    "&:hover": {
                      borderColor: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
                      bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                    },
                  }}
                  onClick={() =>
                    window.open(
                      "https://mui-date-range-picker.indexlabs.dev/mui-date-range-picker/docs",
                      "_self",
                    )
                  }
                >
                  Documentation
                </Button>
              </Stack>
            </motion.div>

            {/* Install command */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <Paper
                variant="outlined"
                sx={{
                  mt: 5,
                  mx: "auto",
                  maxWidth: 520,
                  p: 2,
                  bgcolor: codeBg,
                  borderColor: borderLight,
                  borderRadius: 2,
                }}
              >
                <Typography variant="body2" sx={{ fontFamily: "monospace", color: textBody }}>
                  <span style={{ color: codeAccent }}>$</span> npm install
                  @indexlabs/mui-date-range-picker
                </Typography>
              </Paper>
            </motion.div>
          </Box>

          {/* Demo Section */}
          <Box id="demo">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <Typography variant="h4" fontWeight={700} sx={{ color: textPrimary, mb: 1 }}>
                Inline Calendar
              </Typography>
              <Typography variant="body1" sx={{ color: textTertiary, mb: 3 }}>
                Dual-calendar view with preset range options and action buttons.
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            >
              <Box
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: surfaceBg,
                  border: `1px solid ${borderColor}`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  overflowX: "auto",
                }}
              >
                <DateRangePicker
                  value={range}
                  onChange={setRange}
                  showActions
                  presets
                  onApply={(r) => console.log("Applied:", r)}
                  onClear={() => console.log("Cleared")}
                />
                {range.startDate && range.endDate && (
                  <Typography sx={{ mt: 2, color: textSecondary }}>
                    Selected: {range.startDate.format("YYYY-MM-DD")} to{" "}
                    {range.endDate.format("YYYY-MM-DD")}
                  </Typography>
                )}
              </Box>
            </motion.div>
          </Box>

          {/* Input Demo */}
          <Box>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <Typography variant="h4" fontWeight={700} sx={{ color: textPrimary, mb: 1 }}>
                Input with Popover
              </Typography>
              <Typography variant="body1" sx={{ color: textTertiary, mb: 3 }}>
                Click the input to open the date range picker in a popover.
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            >
              <Box
                sx={{
                  maxWidth: 400,
                  mx: "auto",
                  p: 3,
                  borderRadius: 3,
                  bgcolor: surfaceBg,
                  border: `1px solid ${borderColor}`,
                }}
              >
                <DateRangePickerInput
                  value={inputRange}
                  onChange={setInputRange}
                  label="Date Range"
                  fullWidth
                />
              </Box>
            </motion.div>
          </Box>

          {/* Features Grid */}
          <Box>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <Typography
                variant="h4"
                fontWeight={700}
                sx={{ color: textPrimary, mb: 4, textAlign: "center" }}
              >
                Features
              </Typography>
            </motion.div>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
                gap: 3,
              }}
            >
              {[
                {
                  title: "Dual Calendar View",
                  desc: "Two side-by-side calendars for easy start and end date selection with synchronized month navigation.",
                },
                {
                  title: "Preset Ranges",
                  desc: "Configurable quick-select options for common ranges like last 7, 15, 30, or 90 days.",
                },
                {
                  title: "Theme Integration",
                  desc: "Fully inherits your MUI theme. Colors, typography, and spacing all adapt automatically.",
                },
                {
                  title: "Visual Range Highlighting",
                  desc: "Selected range is clearly highlighted on the calendar with distinct start and end markers.",
                },
                {
                  title: "Inline & Popover Modes",
                  desc: "Use as an inline calendar or as a text input that opens a popover on click.",
                },
                {
                  title: "Date Constraints",
                  desc: "Set min/max dates, disable past or future dates to fit your use case.",
                },
              ].map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                >
                  <Paper
                    sx={{
                      p: 3,
                      height: "100%",
                      bgcolor: surfaceCard,
                      border: `1px solid ${borderColor}`,
                      borderRadius: 2,
                      transition: "border-color 0.3s, box-shadow 0.3s",
                      "&:hover": {
                        borderColor: "rgba(25, 118, 210, 0.4)",
                        boxShadow: "0 0 20px rgba(25, 118, 210, 0.1)",
                      },
                    }}
                    elevation={0}
                  >
                    <Typography variant="h6" fontWeight={600} sx={{ color: textPrimary, mb: 1 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: textTertiary, lineHeight: 1.6 }}>
                      {feature.desc}
                    </Typography>
                  </Paper>
                </motion.div>
              ))}
            </Box>
          </Box>

          <Divider sx={{ borderColor }} />

          {/* Pricing Section */}
          <Box sx={{ textAlign: "center" }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <Typography variant="h4" gutterBottom fontWeight={700} sx={{ color: textPrimary }}>
                Enterprise License
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 4, maxWidth: 600, mx: "auto", color: textTertiary }}
              >
                Get unrestricted access to the full source code, direct support from the
                maintainers, and everything you need to ship with confidence.
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            >
              <Paper
                elevation={0}
                sx={{
                  maxWidth: 480,
                  mx: "auto",
                  p: 4,
                  borderRadius: 3,
                  border: "1px solid rgba(25, 118, 210, 0.4)",
                  bgcolor: surfaceCard,
                  position: "relative",
                  overflow: "visible",
                  boxShadow: "0 0 40px rgba(25, 118, 210, 0.15)",
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

                <Typography
                  variant="h3"
                  fontWeight={800}
                  sx={{ mt: 1, mb: 0.5, color: textPrimary }}
                >
                  $250,000
                </Typography>
                <Typography variant="body2" sx={{ mb: 3, color: textTertiary }}>
                  One-time license fee — no recurring costs, ever.
                </Typography>

                <Divider sx={{ mb: 2, borderColor }} />

                <List dense disablePadding>
                  {[
                    "Full source code access with perpetual license",
                    "Priority support",
                    "Private Slack channel with the core team",
                    "Early access to all future releases and beta features",
                    "Architecture review and integration consulting",
                    "White-label and redistribution rights",
                  ].map((item) => (
                    <ListItem key={item} disableGutters sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleIcon sx={{ color: "#66bb6a" }} fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={item}
                        primaryTypographyProps={{
                          variant: "body2",
                          sx: { color: textBody },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>

                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    mt: 3,
                    py: 1.5,
                    fontWeight: 700,
                    fontSize: "1rem",
                    borderRadius: 2,
                    boxShadow: "0 0 20px rgba(25, 118, 210, 0.4)",
                  }}
                  onClick={() => window.open("mailto:benjaminjsinger@gmail.com", "_blank")}
                >
                  Contact Sales
                </Button>

                <Typography variant="caption" sx={{ display: "block", mt: 2, color: textSubtle }}>
                  Includes a 30-day evaluation period with full refund guarantee.
                </Typography>
              </Paper>
            </motion.div>
          </Box>

          {/* Footer */}
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="body2" sx={{ color: textMuted }}>
              &copy; {new Date().getFullYear()} MUI Date Range Picker
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
