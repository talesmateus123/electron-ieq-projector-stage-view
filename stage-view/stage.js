/******************************************************************************
 * OpenLP - Open Source Lyrics Projection                                      *
 * --------------------------------------------------------------------------- *
 * Copyright (c) 2008-2017 OpenLP Developers                                   *
 * --------------------------------------------------------------------------- *
 * This program is free software you can redistribute it and/or modify it     *
 * under the terms of the GNU General Public License as published by the Free  *
 * Software Foundation version 2 of the License.                              *
 *                                                                             *
 * This program is distributed in the hope that it will be useful, but WITHOUT *
 * ANY WARRANTY without even the implied warranty of MERCHANTABILITY or       *
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for    *
 * more details.                                                               *
 *                                                                             *
 * You should have received a copy of the GNU General Public License along     *
 * with this program if not, write to the Free Software Foundation, Inc., 59  *
 * Temple Place, Suite 330, Boston, MA 02111-1307 USA                          *
 ******************************************************************************/
const PATH = require ('../path.json')
const axios = require('axios')
const URL = `http://${PATH.HOST}:${PATH.PORT}`

window.OpenLP = {
  loadSlides: function () {
    axios.get(`${URL}/api/controller/live/text`).then(res => {
      OpenLP.currentSlides = res.data.results.slides
      OpenLP.currentSlide = 0
      res.data.results.slides.forEach((slide, index) => {
        if (slide.selected)
          OpenLP.currentSlide = index
      })
      OpenLP.updateSlide()
    })
  },
  updateSlide: function() {
    if (OpenLP.currentSlides) {
      var slide = OpenLP.currentSlides[OpenLP.currentSlide]
      var text = ''

      if (slide && !slide.img && OpenLP.show)
        text = slide['text']
      
      text = text.replace(/\n/g, '<br/>')

      const el = document.querySelector('#currentslide')
      el.innerHTML = text
    }
  },
  pollServer: function () {
    axios.get(`${URL}/api/poll`).then(res => {
      console.log(res)
      OpenLP.show = !res.data.results.blank && !res.data.results.display && !res.data.results.theme
      if (OpenLP.currentItem != res.data.results.item ||
          OpenLP.currentService != res.data.results.service) {
        OpenLP.currentItem = res.data.results.item
        OpenLP.currentService = res.data.results.service
        OpenLP.loadSlides()
      }
      else {
        OpenLP.currentSlide = parseInt(res.data.results.slide, 10)
        OpenLP.updateSlide()
      }
    })
  }
}

setInterval('OpenLP.pollServer()', 200)
