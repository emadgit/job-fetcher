import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  home(): string {
    return `
      <body style="padding: 0; margin: 0; display: flex; width: 100%; height: 100%; background: #151816e6; color: white;">
        <div style="display: flex; flex-direction: column; padding: 12px; width: 100%; height: 100%; justify-content: center; align-items: center;">
          <div>
            <h2>Welcome to Almedia job fetcher!</h2>
          </div>
          <div style="display: flex; flex-direction: row; column-gap: 14px; text-align: center;">
            <div style="width: max-content;">
              <a style="color: #718edb; text-decoration: none;" href="/offers">GET: /offers</>
            </div>
            <div style="width: max-content;">
              <a style="color: #718edb; text-decoration: none;" href="/offers/p1">GET: /offers/p1</>
            </div>
            <div style="width: max-content;">
              <a style="color: #718edb; text-decoration: none;" href="/offers/p2">GET: /offers/p2</>
            </div>
          </div>
        </div>
      </body>
    `;
  }
}
