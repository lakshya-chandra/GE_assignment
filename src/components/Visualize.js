import React from "react";

const RenderList1 = props => {
  const { list1,listOneFunc } = props;
  return (
    <div className="col-6">
      {list1.length > 0 && <h2>list1</h2>}
      {list1 &&
        list1.map(listItem1 => {
          return (
            <div className='d-flex m-4'>
              <div
                className="p-1 m-1 col-md-9"
                style={{ backgroundColor: listItem1.color }}
              >
                <p className="text-center">{listItem1.value}</p>
              </div>
              <button className='col-md-3 h-25 mt-3 rotate90' style={{width:'35px'}} onClick={() => listOneFunc(listItem1)} type="button">vv</button>
            </div>
          );
        })}
    </div>
  );
};

const RenderList2 = props => {
  const { list2,listTwoFunc } = props;
  return (
    <div className="col-6">
      {list2.length > 0 && <h2>list2</h2>}
      {list2 &&
        list2.map(listItem2 => {
          return (
            <div className='d-flex m-4'>
               <button className='col-md-3 mt-3 rotate270' style={{width:'35px',height: '30px'}} onClick={() => listTwoFunc(listItem2)} type="button">vv</button>
              <div
                className="p-1 m-1  col-md-9"
                style={{ backgroundColor: listItem2.color }}
              >
                <p className="text-center">{listItem2.value}</p>
              </div>
             
            </div>
          );
        })}
    </div>
  );
};

const compare = ( a, b ) => {
    // if ( a.value < b.value ){
    //   return -1;
    // }
    if ( a.color < b.color ){
      return -1;
    }
    return 0;
  }
    

const filterList = (e, props) => {
  const { list1, list2 } = props.list;
  const filterList1 = list1.sort( compare );
  const filterList2 = list2.sort( compare );
  props.updateList(filterList1, filterList2);
}


const FilterList = (props) => {
  return (
    <div class="mb-3">
      <label for="disabledSelect" class="form-label">
       Sort....
      </label>
      <select
        name="selectedList"
        id="disabledSelect"
        class="form-select"
        onChange={(e) => filterList(e, props)}
        style={{width:'20%'}}
      >
        <option value="na">Sort list</option>
        <option value="color">color</option>
        <option value="value">value</option>
      </select>
    </div>
  );
};

class Visualize extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list1: [],
      list2: []
    };
  }

  componentWillMount() {
    localStorage.setItem('page', JSON.stringify('Visual'));
    const list1 = localStorage.getItem("list1");
    const list2 = localStorage.getItem("list2");
    const parseList1 = JSON.parse(list1);
    const parseList2 = JSON.parse(list2);

    if (list1 !== null) {
      this.setState({
        list1: parseList1
      });
    }
    if (list2 !== null) {
      this.setState({
        list2: parseList2
      });
    }
  }

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

  listOneFunc = async value =>{
    const list1 = localStorage.getItem("list1");
    const list2 = localStorage.getItem("list2");
    const parseList1 = JSON.parse(list1);
    const parseList2 = JSON.parse(list2);
    let obj = parseList1.find(o => o.color === value.color);
    if(obj){
      parseList2.push(value)
      parseList1.splice(parseList1.findIndex(a => a.color === value.color) , 1)
    }
  await this.setState({
      list1:parseList1,
      list2:parseList2
    })
    await localStorage.removeItem('list1');
   await this.storeInLocalStorage("list1", parseList1);
   await this.storeInLocalStorage("list2", parseList2);
  }

  listTwoFunc = async value =>{
    const list1 = localStorage.getItem("list1");
    const list2 = localStorage.getItem("list2");
    const parseList1 = JSON.parse(list1);
    const parseList2 = JSON.parse(list2);
    let obj = parseList2.find(o => o.color === value.color);
    if(obj){
      parseList1.push(value)
      parseList2.splice(parseList2.findIndex(a => a.color === value.color) , 1)
    }
  await this.setState({
      list1:parseList1,
      list2:parseList2
    })
   await localStorage.removeItem('list2');
   await this.storeInLocalStorage("list1", parseList1);
   await this.storeInLocalStorage("list2", parseList2);
  }

  updateList = (filterList1, filterList2) => {
    this.setState({
        list1: filterList1,
        list2:filterList2
    })
  } 

  render() {
    const { list1, list2 } = this.state;
    return (
      <div className="row col-10 col-sm-8 col-md-8 p-5">
        <FilterList list={this.state} updateList={this.updateList}/>
        <RenderList1 list1={list1} listOneFunc={this.listOneFunc}/>
        <RenderList2 list2={list2} listTwoFunc={this.listTwoFunc}/>
      </div>
    );
  }
}

export default Visualize;
