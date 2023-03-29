import { Global, css } from '@emotion/react'

const Fonts = () => {
  return (
    <Global
      styles={css`
        @import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;700&display=swap');
      `}
    />
  )
}

export default Fonts
