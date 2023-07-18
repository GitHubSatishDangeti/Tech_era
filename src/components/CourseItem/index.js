import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import './index.css'

class CourseItem extends Component {
  state = {dataStatus: 'initial', courseData: ''}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({dataStatus: 'loading'})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()

      const formattedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      console.log(formattedData)
      this.setState({courseData: formattedData, dataStatus: 'success'})
    } else {
      this.setState({dataStatus: 'failure'})
    }
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button onClick={this.retry} type="button">
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader />
    </div>
  )

  retry = () => {
    this.getData()
  }

  renderCourses = () => {
    const {courseData} = this.state

    return (
      <div>
        <img src={courseData.imageUrl} alt={courseData.name} />
        <div>
          <h1>{courseData.name}</h1>
          <p>{courseData.description}</p>
        </div>
      </div>
    )
  }

  renderCourse = () => {
    const {dataStatus} = this.state
    switch (dataStatus) {
      case 'success':
        return this.renderCourses()
      case 'failure':
        return this.renderFailureView()
      case 'loading':
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <header>
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
              alt="website logo"
            />
          </Link>
        </header>
        {this.renderCourse()}
      </div>
    )
  }
}
export default CourseItem
