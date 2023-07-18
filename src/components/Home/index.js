import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

class Home extends Component {
  state = {apiStatus: 'initial', data: []}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: 'loading'})

    const response = await fetch('https://apis.ccbp.in/te/courses')
    if (response.ok === true) {
      const data = await response.json()

      const formattedData = data.courses.map(i => ({
        name: i.name,
        id: i.id,
        logoUrl: i.logo_url,
      }))
      console.log(formattedData)

      this.setState({apiStatus: 'success', data: formattedData})
    } else {
      this.setState({apiStatus: 'failure'})
    }
  }

  retry = () => {
    this.getData()
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
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderCourses = () => {
    const {data} = this.state

    return (
      <div>
        <h1>Courses</h1>
        <ul>
          {data.map(i => (
            <li key={i.id}>
              <Link to={`/courses/${i.id}`}>
                <div>
                  <img src={i.logoUrl} alt={i.name} />
                  <p>{i.name}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderCourse = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'success':
        return this.renderCourses()

      case 'loading':
        return this.renderLoadingView()
      case 'failure':
        return this.renderFailureView()
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
export default Home
