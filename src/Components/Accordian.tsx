import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./Accordian.scss";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import CloseIcon from "@mui/icons-material/HighlightOffOutlined";
import CheckIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import DialogBox from "./DialogBox";
import { blue, green, red } from "@mui/material/colors";
import DropDown from "./DropDown";

export const Accordian = (props: any) => {
  const { item, handleChange, expanded, deleteCelebrity, setAllowAccOpen } =
    props;

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [fullName, setFullName] = React.useState(`${item.first} ${item.last} `);
  const [gender, setGender] = React.useState(item.gender);
  const [country, setCountry] = React.useState(item.country);
  const [description, setDescription] = React.useState(item.description);
  const [isEmpty, setIsEmpty] = React.useState(false);
  const [isCheckEnabled, setIsCheckEnabled] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);

  const calculate_age = (dob: string) => {
    var today = new Date();
    var birthDate = new Date(dob);
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    return age_now;
  };

  const [age, setAge] = React.useState(calculate_age(item.dob));

  const handleEdit = () => {
    setEditMode(true);
    setAllowAccOpen(true);
  };

  const handleClose = () => {
    setEditMode(false);
    setAllowAccOpen(false);
    setAge(calculate_age(item.dob));
    setGender(item.gender);
    setCountry(item.country);
    setDescription(item.description);
    setIsEmpty(false);
  };

  const handleDeleteBtn = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const updateDetails = () => {
    console.log(!age, !description, !country, !fullName);
    if (age !== 0 && description && country && fullName) {
      setIsEmpty(false);
      setEditMode(false);
      setAllowAccOpen(false);
    } else setIsEmpty(true);
  };

  const handleGender = (event: any) => {
    setGender(event.target.value);
    setIsCheckEnabled(true);
  };

  const onCountryChange = (event: any) => {
    setCountry(event.target.value);
    setIsCheckEnabled(true);
  };

  const onFullNameChange = (event: any) => {
    setFullName(event.target.value);
    setIsCheckEnabled(true);
  };

  const onAgeChange = (event: any) => {
    setAge(event.target.value);
    setIsCheckEnabled(true);
  };

  const handleDescription = (event: any) => {
    setDescription(event.target.value);
    setIsCheckEnabled(true);
  };

  const AccordianActions = () => {
    return (
      <>
        {editMode ? (
          <div className="accordian-actions">
            <div onClick={handleClose}>
              <CloseIcon sx={{ color: red[500] }} />
            </div>
            <div
              onClick={() => (isCheckEnabled ? updateDetails() : null)}
              className={isCheckEnabled ? "null" : "check-disable"}
            >
              <CheckIcon
                className={isCheckEnabled ? "null" : "disable-svg"}
                sx={{ color: green[500] }}
              />
            </div>
          </div>
        ) : (
          <div className="accordian-actions">
            <div onClick={handleDeleteBtn}>
              <DeleteIcon sx={{ color: red[500] }} />
            </div>
            {age > 18 ? (
              <div onClick={handleEdit}>
                <EditIcon sx={{ color: blue[500] }} />
              </div>
            ) : null}
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <div className="accordian-main">
        <Accordion
          expanded={expanded === `panel-${item.email}`}
          onChange={handleChange(`panel-${item.email}`)}
          className="accordian-container"
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${item.id}bh-header`}
            id={`panel${item.id}bh-header`}
          >
            <div className="accordian-summary">
              <img
                className="celebrity-icon"
                src={item.picture}
                alt="celebrity-img"
              />
              {editMode ? (
                <input
                  pattern="[a-zA-Z]*"
                  className="input-field"
                  type="text"
                  value={fullName}
                  onChange={onFullNameChange}
                  required
                />
              ) : (
                <div className="celebrity-name">{fullName}</div>
              )}
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="acc-details">
              <div className="acc-block">
                <div className="tag">Age</div>
                {editMode ? (
                  <input
                    className="input-field"
                    type="number"
                    value={age}
                    onChange={onAgeChange}
                    required
                  />
                ) : (
                  <div className="tag-content">{age}</div>
                )}
              </div>
              <div className="acc-block">
                <div className="tag">Gender</div>
                {editMode ? (
                  <DropDown gender={gender} handleGender={handleGender} />
                ) : (
                  <div className="tag-content">{gender}</div>
                )}
              </div>
              <div className="acc-block">
                <div className="tag">Country</div>
                {editMode ? (
                  <input
                    pattern="[a-zA-Z]*"
                    className="input-field"
                    type="text"
                    value={country}
                    onChange={onCountryChange}
                    required
                  />
                ) : (
                  <div className="tag-content">{country}</div>
                )}
              </div>
            </div>
            <div>
              {editMode ? (
                <textarea
                  value={description}
                  onChange={handleDescription}
                  required
                >
                  {description}
                </textarea>
              ) : (
                <>
                  <div className="tag">Description</div>
                  <div>{description}</div>
                </>
              )}
            </div>

            {isEmpty ? (
              <div className="error">
                Fields cannot be empty. Check if age, country, name and
                description are valid.
              </div>
            ) : null}

            <div className="actions-container">
              <AccordianActions />
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      <DialogBox
        isDialogOpen={isDialogOpen}
        item={item}
        handleDeleteBtn={handleDeleteBtn}
        deleteCelebrity={deleteCelebrity}
      />
    </>
  );
};
