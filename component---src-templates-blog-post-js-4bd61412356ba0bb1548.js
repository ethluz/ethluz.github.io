(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{136:function(e,t,n){"use strict";n.r(t),n.d(t,"BlogPostTemplate",function(){return d}),n.d(t,"pageQuery",function(){return f});n(48);var a=n(0),r=n.n(a),o=n(4),c=n.n(o),s=n(154),l=n(147),i=n.n(l),m=n(146),p=n(145),u=n(148),d=function(e){var t=e.content,n=e.contentComponent,a=(e.description,e.tags),o=e.title,c=n||u.b;return r.a.createElement("section",{className:"section"},r.a.createElement(i.a,{title:o+" | 路子blog"}),r.a.createElement("div",{className:"container content"},r.a.createElement("h1",{className:"title is-size-2 has-text-weight-bold is-bold-light"},o),r.a.createElement(c,{content:t}),a&&a.length?r.a.createElement("div",{style:{marginTop:"4rem"}},r.a.createElement("h4",null,"Tags"),r.a.createElement("ul",{className:"taglist"},a.map(function(e){return r.a.createElement("li",{key:e+"tag"},r.a.createElement(m.Link,{to:"/tags/"+Object(s.kebabCase)(e)+"/"},e))}))):null))};d.propTypes={content:c.a.node.isRequired,contentComponent:c.a.func,description:c.a.string,title:c.a.string};var g=function(e){var t=e.data.markdownRemark;return r.a.createElement(p.a,null,r.a.createElement(d,{content:t.html,contentComponent:u.a,description:t.frontmatter.description,tags:t.frontmatter.tags,title:t.frontmatter.title}))};g.propTypes={data:c.a.shape({markdownRemark:c.a.object})},t.default=g;var f="1562462377"},148:function(e,t,n){"use strict";n.d(t,"a",function(){return s});var a=n(0),r=n.n(a),o=n(4),c=n.n(o),s=function(e){var t=e.content,n=e.className;return r.a.createElement("div",{className:n,dangerouslySetInnerHTML:{__html:t}})},l=function(e){var t=e.content,n=e.className;return r.a.createElement("div",{className:n},t)};l.propTypes={content:c.a.node,className:c.a.string},s.propTypes=l.propTypes,t.b=l}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-4bd61412356ba0bb1548.js.map