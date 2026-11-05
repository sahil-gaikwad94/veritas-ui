import { ImageResponse } from 'next/og';

export const alt = 'Vexx — make the model prove it';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const FLUTES = Array.from({ length: 7 });

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          padding: 44,
          background: 'linear-gradient(155deg, #1228a8 0%, #2447dd 48%, #0b1a63 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flex: 1,
            borderRadius: 30,
            overflow: 'hidden',
            background: '#FCFCFB',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: '60%',
              padding: '48px 46px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  display: 'flex',
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: '#2447DD',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontSize: 24,
                  fontWeight: 800,
                }}
              >
                V
              </div>
              <div style={{ display: 'flex', fontSize: 24, fontWeight: 800, color: '#101117' }}>vexx</div>
              <div style={{ display: 'flex', fontSize: 13, letterSpacing: 2, color: '#7f8798' }}>
                VEXX1.5
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div
                style={{
                  display: 'flex',
                  fontSize: 72,
                  fontWeight: 800,
                  letterSpacing: -3.2,
                  lineHeight: 0.98,
                  color: '#101117',
                  maxWidth: 560,
                }}
              >
                Make the model prove it.
              </div>
              <div style={{ display: 'flex', fontSize: 24, color: '#525a6a', lineHeight: 1.35, maxWidth: 520 }}>
                Pydantic in. Verified JSON out. A receipt you can check offline.
              </div>
            </div>

            <div style={{ display: 'flex', fontSize: 13, letterSpacing: 2.2, color: '#7f8798' }}>
              APACHE-2.0 · PYTHON + RUST · 425 TESTS
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flex: 1,
              position: 'relative',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(140deg, #0b1a63 0%, #1a37c4 46%, #5a83ff 100%)',
            }}
          >
            {FLUTES.map((_, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  flex: 1,
                  height: '100%',
                  background:
                    'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.5) 62%, rgba(7,18,66,0.28) 100%)',
                }}
              />
            ))}
            <div
              style={{
                display: 'flex',
                position: 'absolute',
                fontSize: 78,
                fontWeight: 800,
                letterSpacing: 12,
                color: '#ffffff',
              }}
            >
              VEXX
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
