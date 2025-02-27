//
//  ViewController.swift
//  apple weather api call
//
//  Created by user271259 on 2/26/25.
//




import UIKit
import Foundation

class ViewController: UIViewController {
    
    struct WeatherResponse: Codable {
        let coord: Coord
        let weather: [Weather]
        let base: String
        let main: Main
        let visibility: Int
        let wind: Wind
        let clouds: Clouds
        let dt: Int
        let sys: Sys
        let timezone: Int
        let id: Int
        let name: String
        let cod: Int
    }

    struct Coord: Codable {
        let lon: Double
        let lat: Double
    }

    struct Weather: Codable {
        let id: Int
        let main: String
        let description: String
        let icon: String
    }

    struct Main: Codable {
        let temp: Double
        let feelsLike: Double
        let tempMin: Double
        let tempMax: Double
        let pressure: Int
        let humidity: Int
        let seaLevel: Int
        let grndLevel: Int
        
        enum CodingKeys: String, CodingKey {
            case temp, pressure, humidity, seaLevel = "sea_level", grndLevel = "grnd_level"
            case feelsLike = "feels_like"
            case tempMin = "temp_min"
            case tempMax = "temp_max"
        }
    }

    struct Wind: Codable {
        let speed: Double
        let deg: Int
    }

    struct Clouds: Codable {
        let all: Int
    }

    struct Sys: Codable {
        let type: Int
        let id: Int
        let country: String
        let sunrise: Int
        let sunset: Int
    }

    func loadWeather(city: String) async throws -> WeatherResponse {
        guard let url = URL(string: "https://api.openweathermap.org/data/2.5/weather?q=\(city)&appid=9eaf097452ce05951c8c387e032b4295") else {
            throw URLError(.badURL)
        }
        
        // Fetch data asynchronously
        let (data, _) = try await URLSession.shared.data(from: url)
        
        // Decode the response
        let decoded = try JSONDecoder().decode(WeatherResponse.self, from: data)
        
        // Return the decoded result
        return decoded
    }

    @IBOutlet weak var label: UILabel!
    @IBOutlet weak var city: UITextField!

    // Button action now marked as async
    @IBAction func fetchCity(_ sender: UIButton) {
        Task {
            do {
                // Safely unwrap city text and ensure it's not empty
                guard let cityName = city.text, !cityName.isEmpty else {
                    DispatchQueue.main.async {
                        self.label.text = "Please enter a city name"
                    }
                    return
                }

                // Fetch weather data for the entered city
                let fetch = try await loadWeather(city: cityName)
                
                // Create a string with relevant weather info
                let weatherInfo = """
                City: \(fetch.name)
                Temperature: \((fetch.main.temp - 273.15).rounded())°C
                Description: \(fetch.weather.first?.description ?? "N/A")
                Feels Like: \((fetch.main.feelsLike - 273.15).rounded())°C
                Humidity: \(fetch.main.humidity)%
                Pressure: \(fetch.main.pressure)
                Wind Speed: \(fetch.wind.speed) m/s
                """
                print(weatherInfo)
                
                // Update the label with weather info on the main thread
                DispatchQueue.main.async {
                    self.label.text = weatherInfo
                }
                
            } catch {
                // Handle errors and update label with error message
                DispatchQueue.main.async {
                    self.label.text = "Error fetching weather data: \(error.localizedDescription)"
                }
            }
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
}
