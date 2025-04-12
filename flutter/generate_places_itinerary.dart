import 'package:flutter/material.dart';
import 'package:flutter_gemini/flutter_gemini.dart';

class GeneratePlacesItineraryScreen extends StatefulWidget {
  final String places;

  const GeneratePlacesItineraryScreen({Key? key, required this.places}) : super(key: key);

  @override
  State<GeneratePlacesItineraryScreen> createState() => _GeneratePlacesItineraryScreenState();
}

class _GeneratePlacesItineraryScreenState extends State<GeneratePlacesItineraryScreen> {
  String result = '';
  bool isLoading = false;

  @override
  void initState() {
    super.initState();
    generateItinerary();
  }

  Future<void> generateItinerary() async {
    setState(() {
      isLoading = true;
    });

    final prompt = '''
I am planning a short trip and will be visiting the following places: ${widget.places}.
Please generate a detailed 2-day travel itinerary starting from morning to night that:

1. Optimizes time and travel between the mentioned places.
2. Adds other popular nearby attractions worth visiting along the way.
3. Includes recommended restaurants and cafes near each attraction for breakfast, lunch, and dinner.
4. Mentions activity timings, travel tips, and special highlights (like light shows or viewpoints).
5. Ensures the trip covers as many high-value experiences as possible in 2 days.

Assume I’m starting from a central location in the city. Output a nicely structured plan with:
- Day-wise breakdown (Day 1 & Day 2)
- Morning, afternoon, and evening sections
- Bonus/optional nearby attractions (if time permits)
''';

    try {
      final gemini = Gemini.instance;

      final response = await gemini.text(prompt);

      setState(() {
        result = response?.output ?? 'No response received.';
        isLoading = false;
      });
    } catch (e) {
      setState(() {
        result = 'Error generating itinerary: $e';
        isLoading = false;
      });
    }
  }

  List<InlineSpan> _formatText(String text) {
    final lines = text.split('\n');
    return lines.map((line) {
      final trimmed = line.trim();
      final boldKeywords = ['Day ', 'Morning', 'Afternoon', 'Evening', 'Bonus', 'Tips', 'Optional'];
      final isBold = boldKeywords.any((kw) => trimmed.startsWith(kw));
      return TextSpan(
        text: '$trimmed\n\n',
        style: TextStyle(
          fontWeight: isBold ? FontWeight.bold : FontWeight.normal,
          fontSize: 16,
          height: 1.5,
          color: Colors.black,
        ),
      );
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Your 2-Day Itinerary'),
        backgroundColor: const Color(0xFF6A5AE0),
      ),
      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : Padding(
        padding: const EdgeInsets.all(16.0),
        child: Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.grey[100],
            borderRadius: BorderRadius.circular(16),
          ),
          child: SelectableText.rich(
            TextSpan(children: _formatText(result)),
          ),
        ),
      ),
    );
  }
}
