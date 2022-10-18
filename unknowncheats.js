/// <reference path="./jquery-3.6.0.js" />

const customCss = String.raw`
.copyButton {
    width: 100%;
    height: 30px;
    color: rgb(200, 200, 200);
    background-color: rgb(32, 32, 32);
    margin: 5px 0 0 0;
    border: none;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.4);
    transition: 200ms;
}
.copyButton:hover {
    background-color: rgb(42, 42, 42);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4);
}
.myDetails {}
.mySummary {
    font-weight: bold;
    padding: 1rem;
    background-color: rgb(32, 32, 32);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.4);
    transition: 200ms;
}
.mySummary:hover {
    background-color: rgb(42, 42, 42);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4);
}
.myImg {
    margin-top: 0.5rem;
    max-width: 100%;
}
.unselectable {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
`

// Copy some text to the clipboard
const copyToClipboard = async text => {
  try {
    await navigator.clipboard.writeText(text)
    alert('Copied to clipboard')
  } catch (e) {
    alert(`Couldn't copy to clipboard: ${e}`)
  }
}

// Make the `Mark This Forum Read` button more accessible
const addMarkAllRead = () => {
  // Find the `Mark This Forum Read` button
  const markRead = $('tr>td>a')
    .filter((i, e) => e.href.includes('do=markread') && e.text.includes('This Forum'))
    .first()
  // Find the `Forum Tools`
  const forumTools = $('#forumtools')
  // Add the button to the end of the bar
  $('<td>').addClass('vbmenu_control').append(markRead.clone()).insertBefore(forumTools)
}

const addCopyToCodeBlocks = () => {
  const getCodeText = elem => {
    const codeLines = $(elem).children('ol').children('li').toArray()
    return codeLines.reduce((acc, e) => acc + e.innerText + '\n', '')
  }

  // Find all code-blocks
  const codeBlocks = $('pre.prettyprint.linenums.prettyprinted')
  // Create a button-template
  const btn = $('<button>').addClass('copyButton').text('copy code')
  // Add a button to each code-block
  codeBlocks.each((i, e) =>
    btn
      .clone()
      .on('click', () => copyToClipboard(getCodeText(e)))
      .appendTo(e.parentElement),
  )
}

const compactifyUserInfos = () => {
  const postTables = $('#posts')
    .find('table')
    .filter((e, i) => i.id && !i.id.includes('imageresizer'))

  // Find the part with the user infos
  const aboutUser = postTables.find('>tbody>tr:nth-child(2)>td:first-child')

  // Remove the avatars
  const images = aboutUser.find('>div>center>a>img')
  images.each((i, e) => $(e).parents().eq(2).css({ display: 'none' }))

  // Remove the stars
  aboutUser.find('>center').css({ display: 'none' })

  aboutUser.each((i, e) => {
    const infos = $(e).children('div').last()
    infos.find('>div').each((i, e) => {
      // Remove last achievements
      $(e).find('>fieldset').parent().css({ display: 'none' })
      // Remove points, level-up, activity
      $(e).find('>div>table:first-child').parents().eq(1).css({ display: 'none' })
    })
  })
}

const wrapImagesInSpoiler = () => {
  // Remove the resize warnings
  $('table[id^=ncode_imageresizer_warning_]').css({ display: 'none' })
  // Find all images within posts that aren't emojis or part of a resize warning
  const postImgs = $('div[id^=post_message_]')
    .find('img')
    .not('.inlineimg')
    .filter((i, e) => !e.src.includes('unknowncheats.me/forum/images/'))
  // Remove `width` and `height` to make the image full-size
  postImgs.removeAttr('width').removeAttr('height').addClass('myImg')
  // Wrap the image in a `details` tag
  postImgs.wrap($('<details>').addClass('myDetails'))
  // Add a summary to the details
  $('<summary>')
    .addClass(['mySummary', 'unselectable'])
    .text(`${postImgs.attr('src')}`)
    .insertBefore(postImgs)
}

const runAll = () => {
  addMarkAllRead()
  addCopyToCodeBlocks()
  compactifyUserInfos()
  wrapImagesInSpoiler()
}

// Inject custom css rules
$(`<style type='text/css'>${customCss}</style>`).appendTo('head')

// Do the thingies
runAll()
