import React from "react";
import _ from "lodash";

class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "",
      value: 0,
      selectedList: "",
      buttonText: "AddItem",
      list1Array: [],
      list2Array: []
    };
  }

  componentWillMount(){
    localStorage.setItem('page', JSON.stringify('Form'));
  }

  handleFormSubmit = e => {
    e.preventDefault();
    this.setState({
      buttonText: "Added"
    });
    const { list1Array, list2Array,  color, value, selectedList } = this.state;
    if (selectedList === "list1") {
      let newObj = {
        color: color,
        value: value,
        selectedList: selectedList
      };
      list1Array.push(newObj);
      this.setState({list1Array: list1Array});
    }
    if (selectedList === "list2") {
      let newObj = {
        color: color,
        value: value,
        selectedList: selectedList
      };
      list2Array.push(newObj);
      this.setState({list2Array: list2Array});
    }
    setTimeout(() => {
      this.setState({
        color: "",
        value: 0,
        selectedList: "",
        buttonText:'AddItem'
      })
    }, 2000);
    const len1 = list1Array.length;
    const len2 = list2Array.length;
    if (selectedList === "list1" && len1 >= 0 ) {
      this.storeInLocalStorage("list1", list1Array);
    }
    if (selectedList === "list2" && len2 >= 0) {
      this.storeInLocalStorage("list2", list2Array);
    }
  };

  storeInLocalStorage = (item, keyAndvalue) => {
    var data = localStorage.getItem(item);
    data = data ? JSON.parse(data) : [];
    keyAndvalue.map(item => {
      data.push(item);
    });
    const colors = data.map(o => o.color);
    const filtered = data.filter(({color}, index) => !colors.includes(color, index + 1))
    localStorage.setItem(item, JSON.stringify(filtered));
  };

  handleOnChnage = e => {
    const key = e.target.name;
    const value = e.target.value;
    this.setState({ [key]: value });
  };

  render() {
    const { color, value, selectedList, buttonText } = this.state;
    return (
      <div className="col-10 col-sm-8 col-md-8 p-5">
        <form onSubmit={this.handleFormSubmit}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              color
            </label>
            <input
              onChange={this.handleOnChnage}
              type="text"
              name="color"
              value={color}
              required
              class="form-control"
              id="exampleInputEmail1"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              value
            </label>
            <input
              type="number"
              name="value"
              required
              value={value}
              class="form-control"
              id="exampleInputValue"
              onChange={this.handleOnChnage}
            />
          </div>
          <div class="mb-3">
            <label for="disabledSelect" class="form-label">
              List
            </label>
            <select
              name="selectedList"
              id="disabledSelect"
              class="form-select"
              onChange={this.handleOnChnage}
            >
              <option value="na">select list</option>
              <option value="list1">list 1</option>
              <option value="list2">list 2</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary" disabled={!color.length > 0 && !value>0 && !selectedList.length>0}>
            {buttonText}
          </button>
        </form>
      </div>
    );
  }
}

export default AddForm;
