import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";

interface FormValues {
  jobname: string;
  jobtype: string;
  joblevel: string;
  jobsalary: string;
  joblocation: string;
  // address2: string;
}

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    console.log(values);
    // You can access formik helpers like actions.resetForm() here if needed.
  };

  return (
    <Box m="20px">
      <Header title="Create Job Position" subtitle="Create a New Job Position for Listing" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Job Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.jobname}
                name="jobname"
                error={!!touched.jobname && !!errors.jobname}
                helperText={touched.jobname && errors.jobname}
                sx={{ gridColumn: "span 4" }}
              />
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel id="job-type-label">Job Type</InputLabel>
                <Select
                  labelId="job-type-label"
                  id="jobtype"
                  name="jobtype"
                  value={values.jobtype}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.jobtype && !!errors.jobtype}
                >
                  <MenuItem value="Full-time">Full-time</MenuItem>
                  <MenuItem value="Part-time">Part-time</MenuItem>
                  <MenuItem value="Remote">Remote</MenuItem>
                  <MenuItem value="Internship">Internship</MenuItem>
                </Select>
                {touched.jobtype && errors.jobtype && (
                  <div style={{ color: 'red' }}>{errors.jobtype}</div>
                )}
              </FormControl>
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel id="job-level-label">Job Level</InputLabel>
                <Select
                  labelId="job-level-label"
                  id="joblevel"
                  name="joblevel"
                  value={values.joblevel}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.joblevel && !!errors.joblevel}
                >
                  <MenuItem value="Entry Level">Entry Level</MenuItem>
                  <MenuItem value="Mid Level">Mid Level</MenuItem>
                  <MenuItem value="Senior Level">Senior Level</MenuItem>
                  <MenuItem value="Lead Level">Lead Level</MenuItem>
                </Select>
                {touched.joblevel && errors.joblevel && (
                  <div style={{ color: 'red' }}>{errors.joblevel}</div>
                )}
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Salary"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.jobsalary}
                name="jobsalary"
                error={!!touched.jobsalary && !!errors.jobsalary}
                helperText={touched.jobsalary && errors.jobsalary}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Job Location"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.joblocation}
                name="joblocation"
                error={!!touched.joblocation && !!errors.joblocation}
                helperText={touched.joblocation && errors.joblocation}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create Job Listing
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

// const phoneRegExp =
//   /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  jobname: yup.string().required("required"),
  jobtype: yup.string().required("required"),
  joblevel: yup.string().required("required"),
  jobsalary: yup
    .string()
    // .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  joblocation: yup.string().required("required"),
  // address2: yup.string().required("required"),
});

const initialValues: FormValues = {
  jobname: "",
  jobtype: "",
  joblevel: "",
  jobsalary: "",
  joblocation: "",
  // address2: "",
};

export default Form;
