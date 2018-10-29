import React from 'react'
import Helmet from 'react-helmet'

import Navbar from '../components/Navbar'
import './all.sass'

// class Profile extends Component{
//     constructor(props) {
//         super(props);
//         this.state = {
//           loading: true
//         };
//       }
    
//     componentDidMount() {
//         // 数据异步请求，请求成功之后setState
//         this.setState({
//           loading: false
//         })
//     }
//     render() {
//         return (
//           <div>
//             {
//               this.state.loading
//               ? <div></div>
//               : <div>页面内容</div>
//             }
//           </div>
//         )
//       }
// }
const TemplateWrapper = ({ children }) => (
  
  <div>
      <Helmet title="luz-blog" />
      {
          children
          ? 
          <div className="">
         
          {children}
          <Navbar />
          </div>
          : 
         <div></div>
      }
  </div>
)

export default TemplateWrapper