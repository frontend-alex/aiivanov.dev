import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const alt = 'AI Ivanov | Creative Software Engineer'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
    const interBlack = readFileSync(join(process.cwd(), 'public/fonts/inter/Inter_24pt-Black.ttf'))
    const interRegular = readFileSync(join(process.cwd(), 'public/fonts/inter/Inter_24pt-Regular.ttf'))

    return new ImageResponse(
        (
            <div
                style={{
                    background: 'black',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    color: 'white',
                    fontFamily: '"Inter"',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '40px 80px',
                        borderRadius: '20px',
                    }}
                >
                    <h1
                        style={{
                            fontSize: 80,
                            fontWeight: 900,
                            margin: 0,
                            marginBottom: 20,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            lineHeight: 1,
                        }}
                    >
                        AI Ivanov
                    </h1>
                    <p
                        style={{
                            fontSize: 30,
                            margin: 0,
                            textTransform: 'uppercase',
                            letterSpacing: '0.2em',
                            opacity: 0.8,
                            fontWeight: 400,
                        }}
                    >
                        Creative Software Engineer
                    </p>
                </div>
            </div>
        ),
        {
            ...size,
            fonts: [
                {
                    name: 'Inter',
                    data: interBlack,
                    style: 'normal',
                    weight: 900,
                },
                {
                    name: 'Inter',
                    data: interRegular,
                    style: 'normal',
                    weight: 400,
                },
            ],
        }
    )
}
