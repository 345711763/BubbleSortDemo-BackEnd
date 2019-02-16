import React from "react";

function ShowSortSteps(props) {
  return (
    <div className="container">
      <label htmlFor="type" className="font-weight-bold">
        Input Type
      </label>
      <select
        className="form-control col-3 mb-3"
        id="type"
        onChange={props.onTypeChangeHandler}
      >
        <option value="Int">Int</option>
        <option value="String">String</option>
      </select>
      <label htmlFor="input" className="font-weight-bold">
        Input
      </label>
      <input
        id="input"
        className="form-control col-4"
        onChange={props.onInputChangeHandler}
        type="text"
      />
      {props.isValid ? (
        <button
          id="submit"
          className="btn btn-primary mt-3 mb-3"
          onClick={props.onSubmitHandler}
        >
          sort
        </button>
      ) : (
        <div className="text-danger">
          <button
            id="submit"
            className="btn btn-primary mt-3 mb-3"
            disabled
            onClick={props.onSubmitHandler}
          >
            sort
          </button>
          Input is invalid
        </div>
      )}

      {(function() {
        if (props.type === "Int") {
          let max = Math.max(...props.data);
          let min = Math.min(...props.data);
          return props.data.map((value, index) => {
            let width = ((value - min) * 100) / (max - min);
            console.log("width" + width);
            return (
              <div
                key={index}
                style={{
                  width: `${width}%`,
                  borderRadius: `5px`,
                  textAlign: "right",
                  padding: "2px"
                }}
                className="bg-info"
              >
                {value}
              </div>
            );
          });
        }
        if (props.type === "String") {
          return props.data.map((value, index) => {
            return (
              <div
                key={index}
                style={{
                  width: "100%",
                  borderRadius: "5px",
                  textAlign: "center",
                  padding: "2px"
                }}
                className="bg-info"
              >
                {value}
              </div>
            );
          });
        }
      })()}
    </div>
  );
}

export default ShowSortSteps;
