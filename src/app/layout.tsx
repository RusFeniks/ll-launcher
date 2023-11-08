import Footer from '@/component/footer/footer.component';
import Header from '@/component/header/header.component';
import classNames from 'classnames';
import { Montserrat } from 'next/font/google';
import style from './app.module.scss';
import './globals.scss';

const montserrat = Montserrat({ subsets: ['cyrillic'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={classNames(montserrat.className, style['app'])}>
        <Header className={style['app__header']}/>
        <div className={style['app__content']}>
          {children}
        </div>
        <Footer className={style['app__footer']}/>
      </body>
    </html>
  )
}
