import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import "../SearchForm/SearchForm.css";
import { useState, useRef } from "react";
import axios from "axios";
import ngeohash from "ngeohash";

function SearchForm({ setData, setNoResultsFlag }) {
  const typeaheadRef = useRef(null);

  //Form values
  const [keyword, setKeyword] = useState("");
  const [distance, setDistance] = useState(10);
  const [category, setCategory] = useState("Default");
  const [location, setLocation] = useState("");

  //For checkbox functionality
  const [checked, setChecked] = useState(false);

  //For autocomplete functionality
  const [keywords, setKeywords] = useState([]);

  const keywordClear = () => {
    setKeyword("");
    typeaheadRef.current.clear();
  };

  const handleSearch = (param) => {
    setKeywords([]);
    const searchingItem = document.querySelector(
      ".rbt-menu .dropdown-item.disabled"
    );
    if (searchingItem) {
      searchingItem.textContent = "";
      const spinner = document.createElement("div");
      spinner.classList.add(
        "spinner-border",
        "spinner-border-thin",
        "text-primary"
      );
      spinner.setAttribute("role", "status");
      const srOnly = document.createElement("span");
      srOnly.classList.add("sr-only");
      spinner.appendChild(srOnly);
      searchingItem.appendChild(spinner);
    }

    axios
      .get("/keywordsearch", { params: { keyword: param } })
      .then((response) => {
        setKeywords(response.data.keywords);
        if (response.data.keywords.length === 0) {
          const keywordElement = document.getElementById("keyword");
          if (keywordElement) {
            keywordElement.style.display = "none";
          }
        }
      })
      .catch((error) => {
        console.log("Error in keyword search at client");
        console.log(error);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    var geohash = "";
    if (checked) {
      geohash = await getLocation();
      makeRestAPICall(geohash);
    } else {
      var address = location;
      var key = "AIzaSyCXalOHLiAuigAYK-BHrWvKTknN1-LzdJI";
      var url =
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        address +
        "&key=" +
        key;
      const response = await fetch(url);
      const jsonResponse = await response.json();
      if (jsonResponse.status === "OK") {
        var latitude = jsonResponse.results[0].geometry.location.lng;
        var longitude = jsonResponse.results[0].geometry.location.lat;
        geohash = ngeohash.encode(longitude, latitude, 7);
        makeRestAPICall(geohash);
      } else {
        setNoResultsFlag(true);
      }
    }
  };
  const getLocation = async () => {
    const url = "https://ipinfo.io/?token=b3a26d7c4db9dc";

    const response = await fetch(url);
    const jsonResponse = await response.json();
    const locArray = jsonResponse.loc.split(",");
    const longitude = locArray[0];
    const latitude = locArray[1];
    return ngeohash.encode(longitude, latitude, 7);
  };

  const makeRestAPICall = (geohash) => {
    axios
      .get("/getData", {
        params: {
          keyword: keyword,
          distance: distance,
          category: category,
          geohash: geohash,
        },
      })
      .then((response) => {
        if (response.data._embedded === undefined) {
          setNoResultsFlag(true);
          setData([]);
        } else {
          var events = response?.data?._embedded?.events ?? "";
          if (events.length > 1) {
            events.sort((a1, a2) => {
              if (
                a1.dates.start.localDate + a1.dates.start.localTime >
                a2.dates.start.localDate + a2.dates.start.localTime
              ) {
                return 1;
              } else {
                return -1;
              }
            });
          }
          setNoResultsFlag(false);
          setData(events);
        }
      })
      .catch((error) => {
        setNoResultsFlag(true);
        setData([]);
        console.log(error);
      });
  };

  return (
    <div>
      <div
        className="container-sm p-3 search-form"
        style={{ maxWidth: "700px" }}
      >
        <Form className="rounded-4 p-4" onSubmit={handleSubmit}>
          <h4 className="formHeading">Events Search</h4>
          <hr id="form-hr"></hr>
          <Form.Group className="col req">
            <Form.Group>
              <Form.Label className="required">Keyword</Form.Label>

              <AsyncTypeahead
                id="keyword"
                name="keyword"
                isLoading={false}
                options={keywords ?? []}
                labelKey="name"
                minLength={1}
                onSearch={handleSearch}
                filterBy={() => true}
                value={keyword}
                onChange={(e) => {
                  setKeyword(e[0]);
                }}
                onBlur={() => {
                  setKeyword(typeaheadRef.current.getInput().value);
                }}
                ref={typeaheadRef}
                inputProps={{ required: true }}
              />
            </Form.Group>
          </Form.Group>
          <Form.Group className="row">
            <Form.Group className="col-sm-6 pt-3">
              <Form.Label>Distance</Form.Label>
              <Form.Control
                type="number"
                id="distance"
                value={distance}
                onChange={(e) => {
                  setDistance(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="col-sm-4 pt-3 req">
              <Form.Label>Category</Form.Label>
              <Form.Select
                aria-label="Default"
                id="category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                required
              >
                <option value="Default">Default</option>
                <option value="Music">Music</option>
                <option value="Sports">Sports</option>
                <option value="Arts & Theatre">Arts & Theatre</option>
                <option value="Film">Film</option>
                <option value="Miscellaneous">Miscellaneous</option>
              </Form.Select>
            </Form.Group>
          </Form.Group>
          <Form.Group className="col mb-3 pt-3 req">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              required
              disabled={checked}
              value={location}
              id="location"
              autoComplete="off"
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" id="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Auto-detect your location"
              checked={checked}
              onChange={() => {
                if (!checked) {
                  setLocation("");
                }
                setChecked(!checked);
              }}
            />
          </Form.Group>
          <Form.Group className="row">
            <Form.Group className="text-center">
              <Button
                className="form-button me-3"
                variant="danger"
                type="submit"
                onClick={() => {
                  setData([]);
                }}
              >
                SUBMIT
              </Button>
              <Button
                className="form-button ml-3"
                variant="primary"
                type="reset"
                onClick={() => {
                  setChecked(false);
                  keywordClear();
                  setDistance(10);
                  setLocation("");
                  setCategory("Default");
                  setData([]);
                  setNoResultsFlag(false);
                }}
              >
                CLEAR
              </Button>
            </Form.Group>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default SearchForm;
