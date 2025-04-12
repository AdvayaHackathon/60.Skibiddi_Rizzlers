import 'package:flutter/material.dart';
import 'generate_itinerary.dart';
import 'generate_places_itinerary.dart';
import 'image_upload.dart';
import 'analyze_photo.dart';
import 'festival_finder.dart';
import 'media_screen.dart';
import 'Translator_screen.dart';

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key}) : super(key: key);

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final TextEditingController _destinationController = TextEditingController();
  final TextEditingController _placesController = TextEditingController();

  @override
  void dispose() {
    _destinationController.dispose();
    _placesController.dispose();
    super.dispose();
  }

  void _navigateToItineraryScreen() {
    final destination = _destinationController.text.trim();
    if (destination.isNotEmpty) {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => GenerateItineraryScreen(destination: destination),
        ),
      );
    } else {
      _showSnackBar("Please enter a destination");
    }
  }

  void _navigateToPlacesItinerary() {
    final places = _placesController.text.trim();
    if (places.isNotEmpty) {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => GeneratePlacesItineraryScreen(places: places),
        ),
      );
    } else {
      _showSnackBar("Please enter the places you want to visit");
    }
  }

  void _showSnackBar(String message) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(message)));
  }

  void _showInputDialog({
    required String title,
    required TextEditingController controller,
    required VoidCallback onConfirm,
  }) {
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: Text(title),
        content: TextField(
          controller: controller,
          decoration: const InputDecoration(
            border: OutlineInputBorder(),
            hintText: 'Type here...',
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              onConfirm();
            },
            child: const Text('Go'),
          ),
        ],
      ),
    );
  }

  Widget _buildCard({
    required String title,
    required IconData icon,
    required Color color,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      child: Card(
        color: color.withOpacity(0.85),
        elevation: 8,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        child: Container(
          padding: const EdgeInsets.all(16),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(icon, size: 40, color: Colors.white),
              const SizedBox(height: 12),
              Text(
                title,
                textAlign: TextAlign.center,
                style: const TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                  fontSize: 15,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [Color(0xFF4facfe), Color(0xFF00f2fe)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SizedBox(height: 10),
                Text(
                  'AI Travel Planner',
                  style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(height: 10),
                Text(
                  'Explore and plan with smart features below:',
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    color: Colors.white70,
                  ),
                ),
                const SizedBox(height: 50),
                Expanded(
                  child: GridView.count(
                    crossAxisCount: 2,
                    crossAxisSpacing: 16,
                    mainAxisSpacing: 16,
                    childAspectRatio: 1,
                    children: [
                      _buildCard(
                        title: 'Generate Itinerary',
                        icon: Icons.flight_takeoff,
                        color: Colors.blueAccent,
                        onTap: () => _showInputDialog(
                          title: 'Enter a Destination',
                          controller: _destinationController,
                          onConfirm: _navigateToItineraryScreen,
                        ),
                      ),
                      _buildCard(
                        title: 'Plan Multi-Place Trip',
                        icon: Icons.travel_explore,
                        color: Colors.deepPurpleAccent,
                        onTap: () => _showInputDialog(
                          title: 'Enter Places (e.g., palace, lake)',
                          controller: _placesController,
                          onConfirm: _navigateToPlacesItinerary,
                        ),
                      ),
                      _buildCard(
                        title: 'Festival Finder',
                        icon: Icons.auto_awesome,
                        color: Colors.tealAccent,
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(builder: (_) => const FestivalFinderScreen()),
                          );
                        },
                      ),
                      _buildCard(
                        title: 'Analyze Image Info',
                        icon: Icons.image_search,
                        color: Colors.orangeAccent,
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(builder: (_) => const AnalyzePhotoScreen()),
                          );
                        },
                      ),
                      _buildCard(
                        title: 'Social Media',
                        icon: Icons.thumb_up,
                        color: Colors.pinkAccent,
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(builder: (_) => ImageUploadScreen()),  // Navigate to Image Upload screen
                          );
                        },
                      ),

                      _buildCard(
                        title: 'Translator',
                        icon: Icons.translate,
                        color: Colors.greenAccent,
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(builder: (_) => TranslatorScreen()),
                          );
                        },
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
