import './button.scss'


export const Button = (title: { class: string, title: string }) => {
  return (
        <button className={`button ${title.class} `}>{title.title}</button>
    )
}
