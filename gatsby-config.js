module.exports = {
  siteMetadata: {
    title: '地球太空船码农',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
          path: `${__dirname}/markdown`,
          name: 'content',
      },
    },
    
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    // {
    //   resolve: 'gatsby-transformer-remark',
    //   options: {
    //     plugins: [
    //         `gatsby-remark-autolink-headers`,
    //         `gatsby-remark-prismjs`,
    //         // {
    //         //     resolve: `gatsby-remark-prismjs`,
    //         // }
    //     ],
    //   },
    // },
    {
        resolve: 'gatsby-transformer-remark',
        // options: {
        //   plugins: [
        //     `gatsby-remark-autolink-headers`,
        //     {
        //       resolve: `gatsby-remark-prismjs`,
        //     }
        //   ]
        // }
        options: {
            plugins: [
              {
                resolve: `gatsby-remark-images`,
                options: {
                  maxWidth: 700,
                  showCaptions: true,
                },
              },
              // {
              //   resolve: 'gatsby-remark-external-links',
              //   options: {
              //     target: '_blank',
              //     rel: 'nofollow noopener noreferrer',
              //   },
              // },
              {
                resolve: 'gatsby-remark-prismjs',
                options: {
                  inlineCodeMarker: '>',
                },
              },
        
              {
                resolve: `gatsby-remark-autolink-headers`,
                options: {
                  offsetY: `100`,
                },
              },
              `gatsby-remark-responsive-iframe`,
            ],
          },
    },
   
    // `gatsby-remark-responsive-iframe`,
    `gatsby-plugin-styled-components`,
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-offline`,
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
