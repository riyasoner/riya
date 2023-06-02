
import { Component } from 'react';
import list from './data'

class App extends Component {
  constructor() {
    super();
    this.state = {
      studentList: list,
      branchName: 'all',
      status: 'false'

    }
  }
  addstudent = () => {
    let name = this.name.value;
    let roll = this.roll.value;
    let mobile = this.mobile.value;
    let branch = this.branch.value;
    this.setState({ studentList: [...this.state.studentList, { name, roll, mobile, branch }] });
  }
  StuWithBranch = (branchName) => {
    this.setState({ branchName })
  }
  StuRemoveInList = (roll) => {
    let index = this.state.studentList.findIndex((student) => { return student.roll == roll })
    this.state.studentList.splice(index, 1);
    this.setState({ studentList: this.state.studentList })
  }
  validRoll = () => {
    let roll = this.roll.value;
    let span = this.span;
    let status = this.state.studentList.some((student) => { return student.roll == roll })
    this.setState({ status: status });
  }
  render() {
    return <div className='container'>
      <div className='row bg-warning mt-3'>
        <div className='col-12  text-center p-2 '>
          <h3 className='mt-2'>Student Data</h3>
        </div>
      </div>
      <div className='row '>
        <div className='col-4 mt-5'>
          <h2>Add Student</h2>
          <div className='form-group mt-2'>
            <input ref={(roll) => this.roll = roll} type="text" className='form-control' placeholder='enter roll no' onBlur={this.validRoll}></input>
            {this.state.status && <span ref={(span) => this.span = span} className='text-danger'>no alerady exist</span>}
          </div>
          <div className='form-group mt-3 '>
            <input ref={(name) => this.name = name} type="text" className='form-control' placeholder='enter name'></input>
          </div>
          <div className='form-group mt-3'>
            <input ref={(mobile) => this.mobile = mobile} type="text" className='form-control' placeholder='enter contact no '></input>
          </div>
          <div className='form-group mt-3 '>
            <input ref={(branch) => this.branch = branch} type="text" className='form-control' placeholder='enter branch'></input>
          </div>
          <button className='btn btn-danger mt-3' style={{ width: '40%' }} onClick={this.addstudent}>add</button>
        </div>
        <div className='offset-2 col-6 mt-5'>
          <h2>StudentList</h2>
          <table className='row  table border '>
            <thead>
              <th className='col-1'>ID</th>
              <th className='col-2'>Name</th>
              <th className='col-3'>RollNo</th>
              <th className='col-3'>Contact</th>
              <th className='col-3'>Branch</th>
              <th className='col-3'>delete</th>

            </thead>
            <tbody>
              {this.state.studentList.filter(student => this.state.branchName == "all" || student.branch == this.state.branchName).map((Student, index) => <tr>
                <td className='col-1'>{index + 1}</td>
                <td className='col-2'>{Student.name}</td>
                <td className='col-3'>{Student.roll}</td>
                <td className='col-3'>{Student.mobile}</td>
                <td className='col-3'>{Student.branch}</td>
                <td className='col-12 btn btn-outline-danger mt-2 mb-2' onClick={() => { this.StuRemoveInList(Student.roll) }} >Delete</td>

              </tr>
              )}

            </tbody>
          </table>
          <div>
            <button class="btn btn-info" onClick={() => { this.StuWithBranch('CS') }}> cs stu({this.state.studentList.filter((student) => { if (student.branch == 'CS') return student }).length})</button>
            <button class="btn btn-success mx-2 " onClick={() => { this.StuWithBranch('IT') }}>  IT stu({this.state.studentList.filter((student) => { if (student.branch == 'IT') return student }).length})</button>
            <button class="btn btn-danger mx-2" onClick={() => { this.StuWithBranch('Bcom') }}> Bcom stu({this.state.studentList.filter((student) => { if (student.branch == 'Bcom') return student }).length})</button>
            <button class="btn btn-info mx-2 " onClick={() => { this.StuWithBranch('Btech') }}>  Btech stu({this.state.studentList.filter((student) => { if (student.branch == 'Btech') return student }).length})</button>
            <button class="btn btn-info mx-2 " onClick={() => { this.StuWithBranch('all') }}>  all stu({this.state.studentList.map((student) => { return student }).length})</button>

          </div>
        </div>
      </div>
    </div>

  }
}

export default App;
