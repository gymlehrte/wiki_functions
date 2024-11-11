const rxYoutube = /^.*^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/|shorts\/)?)([\w\-]+)(\S+)?$/
const rxScreencast = /^.*^((?:https?:)?\/\/)?(www\.)?(screencast\.com)(\/users)\/([a-z0-9_-]+)\/folders\/([a-z0-9%_-]+)\/media\/([a-z0-9_-]+)(?:\/)?$/im

  window.boot.register('vue', () => {
    window.onload = () => {
      document.querySelectorAll('.contents oembed, .contents a').forEach(elm => {
        // making links-list work 
        if (elm.closest('ul.links-list')) { return; }
        const url = elm.hasAttribute('url') ? elm.getAttribute('url') : elm.getAttribute('href')
        let newElmHtml = null
       
        const ytMatch = url.match(rxYoutube)
        const scMatch = url.match(rxScreencast)

 
        if (ytMatch) {
          newElmHtml = `<iframe id="ytplayer" type="text/html" width="640" height="360" src="https://www.youtube-nocookie.com/embed/${ytMatch[5]}" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        
      } else if(scMatch) {
        newElmHtml = `<iframe id="scplayer" type="text/html" width="640" height="360" src="${url}/embed" frameborder="0" allowfullscreen></iframe>`

        } else {
         return
         }

        const newElm = document.createElement('div') 
        newElm.classList.add('responsive-embed')
        newElm.insertAdjacentHTML('beforeend', newElmHtml)
        elm.replaceWith(newElm)
      })
    }  
  })