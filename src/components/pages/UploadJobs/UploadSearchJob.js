import React, { useEffect, useState } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem,
} from "@mui/material";
import { PROVINCES } from "../../../constants/locations";
import {
  get_all_jobs_owner,
  selectIsLoading,
  selectJobsOwner,
} from "../../../store/JobSlice";
import { useDispatch, useSelector } from "react-redux";
import SpinnerLoading from "../../commons/SpinnerLoading";
import ListJobUpload from "./UploadListJob";

function SearchJobUpload() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const dispatch = useDispatch();
  const loading = useSelector(selectIsLoading);
  const data = useSelector(selectJobsOwner);
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
  };
  const jobs = [];
  data.forEach((job) => {
    const { job_name, location, pdf_upload, recruiter, skills, active, id } =
      job;
    const { company_name, avatar_url, account } = recruiter;
    const { first_name, last_name, email } = account;
    const shortenedJob = {
      id,
      active,
      name: `${first_name} ${last_name}`,
      email,
      location,
      skills,
      avatar_url,
      pdf_upload,
      company_name,
      job_name,
    };
    jobs.push(shortenedJob);
  });
  const filteredJobs = jobs
    .filter((job) =>
      job.job_name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((job) =>
      job.location.toLowerCase().includes(selectedProvince.toLowerCase())
    );
  useEffect(() => {
    document.title = "Search Job | Hire IT";
    dispatch(get_all_jobs_owner());
  }, [dispatch]);

  return (
    <div>
      <SpinnerLoading loading={loading} />
      <Grid container spacing={2} className="search_job_upload-container">
        <Grid item>
          <FormControl className="search_job_upload-form-container">
            <InputLabel htmlFor="search" style={{ marginRight: "2rem" }}>
              Search
            </InputLabel>
            <Input id="search" value={searchQuery} onChange={handleSearch} />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <InputLabel id="province-select-label">Province</InputLabel>
            <Select
              labelId="province-select-label"
              id="province-select"
              value={selectedProvince}
              onChange={handleProvinceChange}
              style={{ minWidth: "150px" }}
              MenuProps={{
                classes: {
                  paper: "my-custom-class",
                },
                style: {
                  maxHeight: "400px",
                },
              }}
            >
              <MenuItem value="">All provinces</MenuItem>
              {PROVINCES.map((province) => (
                <MenuItem key={province} value={province}>
                  {province}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <ListJobUpload jobs={filteredJobs} />
      </Grid>
    </div>
  );
}

export default SearchJobUpload;
