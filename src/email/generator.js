console.log('Here we are 😆🚀')

const removeAccents = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, "")

const signature = (person) => {
  const {img, firstname, lastname, title, phone} = person
  const firstnameSanitized = removeAccents(firstname)
  const lastnameSanitized = removeAccents(lastname)
  return `<table style="padding: 20px 0">
    <tbody>
      <tr>
        <td style="padding: 0 30px;" valign="top">
          <img width="90px" height="90px" src="./assets/${img}" />
        </td>
        <td style="padding-bottom: 20px">
          <div style="font-family: Avenir-Heavy; font-size: 16px; color: #4A4A4A;letter-spacing: 0.82px; line-height: 22px;">
            ${_.capitalize(firstname)} ${_.capitalize(lastname)}
          </div>
          <div style="font-family: Avenir-Book; font-size: 16px; color: #4A4A4A; letter-spacing: 0.82px; line-height: 22px; padding-bottom: 8px;">
            ${title}
          </div>

          <div style="font-family: Avenir-Book; font-size: 16px; color: #9B9B9B; letter-spacing: 0.82px; line-height: 24px; padding-bottom: 12px;">
            <div>
                <img src="https://static.elium.tv/email/assets/i_mail.png" /> ${firstnameSanitized}.${lastnameSanitized}@elium.io
            </div>
            ${phone ? `<div>
                <img src="https://static.elium.tv/email/assets/i_phone.png" /> ${phone}
            </div>` : ''}
          </div>

          <div style="padding-bottom: 20px;border-bottom: 1px solid #D8D8D8">
            <a href="https://twitter.com/Elium_tech" target="_blank" style="text-decoration: none; color: white; width: 22px; height: 22px;">
                <img src="https://static.elium.tv/email/assets/i_twitter.png" />
            </a>
            <a href="https://www.facebook.com/EliumTV" target="_blank" style="text-decoration: none; color: white; width: 22px; height: 22px;">
                <img src="https://static.elium.tv/email/assets/i_facebook.png" />
            </a>
            <a href="https://www.linkedin.com/company/elium" target="_blank" style="text-decoration: none; color: white; width: 22px; height: 22px;">
                <img src="https://static.elium.tv/email/assets/i_linkedin.png" />
            </a>
          </div>
        </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>
          <a href="https://static.elium.tv/email/index_event.html">
            <img src="https://static.elium.tv/email/i_event.png">
          </a>
        </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>
          <div style="padding-top: 15px;">
            <a href="https://www.elium.io" target="_blank" style="text-decoration: none">
              <img width="80px" height="29px" src="https://static.elium.tv/email/assets/logo_elium.png" />
            </a>
          </div>
        </td>
      </tr>
      
    </tbody>
  </table>`
}

const app = () => {
  const people = [{
    img: 'fabien_livet.png',
    firstname: 'fabien',
    lastname: 'livet',
    title: 'CEO',
    phone: '+33 (0) 6 66 90 97 45'
  }, {
    img: 'benjamin_longearet.png',
    firstname: 'benjamin',
    lastname: 'longearet',
    title: 'CTO',
    phone: '+33 (0) 6 15 44 05 74'
  }, {
    img: 'julie_chaplain.png',
    firstname: 'julie',
    lastname: 'chaplain',
    title: 'Sales Director France',
    phone: '+33 (0) 6 59 84 31 64'
  }, {
    img: 'jules_mary.png',
    firstname: 'jules',
    lastname: 'mary',
    title: 'Product & Operation Specialist',
    phone: '+33 (0) 6 23 76 27 49'
  }, {
    img: 'clementine_stora.png',
    firstname: 'clémentine',
    lastname: 'stora',
    title: 'Artistic Director'
  }]

  const $inputHidden = $('#input-hidden')
  const $people = $('#people')
  const $signature = $('#signature')
  const $signatureTabs = $('#signature .block__tab label')
  const $tabContent = $('#tab-content')
  const $btnCopy = $('#btn-copy')

  let currentType = 'preview'
  let currentPerson = people[0]
  let currentSignature = signature(currentPerson)

  $inputHidden.val(currentSignature)
  updateTabContent()

  // Build people list
  $people.html(people.map(({img}, index) => `
    <a class="pr-2${index === 0 ? ' active' : ''}" href="javascript:;" data-index="${index}">
      <img src="assets/${img}">
    </a>
  `))

  // Listen for click on a person
  $people.on('click', 'a', event => {
    const $currentElt = $(event.currentTarget)
    if (!$currentElt.hasClass('active')) {
      $people.find('a').removeClass('active')
      $currentElt.addClass('active')
      currentPerson = people[$currentElt.data('index')]
      currentSignature = signature(currentPerson)
      $inputHidden[0].value = currentSignature
      updateTabContent()
    }
    event.stopPropagation()
  })

  // Listen for click on HTML/Preview
  $signature.find('.block__tab').on('click', 'label', event => {
    const $currentElt = $(event.currentTarget)
    if(!$currentElt.hasClass('active')) {
      $signatureTabs.removeClass('active')
      $currentElt.addClass('active')
      currentType = $(event.currentTarget).data('type')
      updateTabContent()
    }
    event.stopPropagation()
  })

  // Handle copy button
  $btnCopy.click(() => {
    $inputHidden[0].select()
    document.execCommand("copy");
  })

  // Update the tab content depending on the type
  function updateTabContent() {
    if (currentType === 'html') {
      $tabContent.html(`<textarea style="width: 100%">${currentSignature}</textarea>`)
    } else {
      $tabContent.html(`${currentSignature}`)
    }
  }
}

// Boot the app
app()